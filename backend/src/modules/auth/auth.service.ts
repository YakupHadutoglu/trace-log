import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { prisma } from '../../config/prisma';
import { redisClient } from '../../config/redis';
import env from '../../config/env';
import { CreateUserDto } from '../../types/user';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/token';
import { json } from 'body-parser';
import { isUserLocked, increaseFailedAttempts, resetFailedAttempts } from '../../utils/lockout';
import VerifyService from './verify.service';

export class AuthService {
    static async findUserByEmail(email: string) {
        return await prisma.user.findUnique({ where: { email } });
    }
    static async createUser(data: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                surname: data.surname,
                email: data.email,
                password: hashedPassword,
                approvedStatus: false,
                phoneNumber: data.phoneNumber,
                isPhoneVerified: false
            },
            select: {
                id: true,
                name: true,
                surname: true,
                email: true,
                approvedStatus: true,
                phoneNumber: true,
                isPhoneVerified: true
            }
        });
        VerifyService.sendVerificationEmail(newUser).catch(err => {
            console.error("Mail gönderme hatası:", err);
        });
        return newUser;
    }

    static async login(email: string, password: string) {
        const user = await this.findUserByEmail(email);

        if (!user) throw new Error('Invalid Credentials');

        const userIdStr = user.id.toString();

        const locked = await isUserLocked(userIdStr);
        if (locked) {
            throw new Error('Hesabınız çok fazla başarısız deneme nedeniyle geçici olarak kilitlendi. Lütfen daha sonra tekrar deneyin.');
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            await increaseFailedAttempts(userIdStr);
            throw new Error('Invalid Credentials');
        }

        await resetFailedAttempts(userIdStr);

        const sessionData = await this.createSession(user.id, {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            approvedStatus: (user as any).approvedStatus,
            phoneNumber: user.phoneNumber,
            isPhoneVerified: (user as any).isPhoneVerified
        });

        return {
            ...sessionData,
            user: { id: user.id, name: user.name, surname: user.surname, email: user.email, approvedStatus: (user as any).approvedStatus, phoneNumber: user.phoneNumber, isPhoneVerified: (user as any).isPhoneVerified }
        };
    }

    static async createSession(userId: number | string, extraPayload: object = {}) {
        const userIdStr = userId.toString();

        const access = signAccessToken({ sub: userIdStr, ...extraPayload } as any);
        const refresh = signRefreshToken({ sub: userIdStr } as any);
        const csrf = uuidv4();

        const decoded = jwt.decode(refresh) as any;
        const expiresAtMs = (decoded?.exp ? decoded.exp * 1000 : Date.now() + 7 * 24 * 60 * 60 * 1000);
        const ttlSeconds = Math.ceil((expiresAtMs - Date.now()) / 1000);

        const key = `refresh:${refresh}`;
        const value = JSON.stringify({ userId: userIdStr, csrf, expiresAt: expiresAtMs });

        await redisClient.set(key, value, 'EX', ttlSeconds);

        return { access, refresh, csrf };
    }
    static async validateRefreshToken(token: string) {
        const key = `refresh:${token}`;
        const raw = await redisClient.get(key);
        if (!raw) return null;
        return JSON.parse(raw) as { userId: string; csrf: string; expiresAt: number };
    };
    static async deleteSession(token: string) {
        await redisClient.del(`refresh:${token}`);
    }
    static async refreshSession(refreshToken: string, csrfHeader: string) {
        const payload = verifyRefreshToken(refreshToken);
        if (!payload) throw new Error('Invalid refresh token.');

        const record = await this.validateRefreshToken(refreshToken);
        if (!record) throw new Error('Session not found or expired in Redis');

        if (!csrfHeader || record.csrf !== csrfHeader) throw new Error('CSRF token mismatch.');

        await this.deleteSession(refreshToken);

        const user = await prisma.user.findUnique({
            where: { id: Number(record.userId) } // ID tipine göre ayarla
        });

        if (!user) throw new Error('User record not found during refresh.');

        return await this.createSession(user.id, {
            name: user.name,
            surname: user.surname,
            email: user.email,
            approvedStatus: user.approvedStatus,
            phoneNumber: user.phoneNumber,
            isPhoneVerified: user.isPhoneVerified, // DB'den gelen taze veri
            createdAt: user.createdAt
        });
    }
    static async passwordDbGet(userId: number) {
        const password = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                password: true
            }
        });
        return password;
    }
    static async changePassword(userId: number, oldPassword: string, newPassword: string) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword
            }
        });
    }

    private static getResetKey(email: string) { return `password-reset:${email}` };
    private static getTokenKey(token: string) { return `reset-token:${token}` };

    static async requestPasswordReset(email: string) {
        const user = await this.findUserByEmail(email);

        if (!user) throw new Error('USER_NOT_FOUND');

        const resetToken = crypto.randomBytes(32).toString('hex');
        const expriretionSeconds = 1800; //* 30 minutes

        await redisClient.set(this.getResetKey(email), resetToken, `EX`, expriretionSeconds);
        await redisClient.set(this.getTokenKey(resetToken), email, 'EX', expriretionSeconds);

        await VerifyService.sendResetPasswordEmail(email, resetToken);

        return resetToken;
    }

    static async resetPasswordWithToken(token: string, newPassword: string) {
        const email = await redisClient.get(this.getTokenKey(token));

        if (!email) throw new Error('INVALID_OR_EXPIRED_TOKEN');

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: hashedPassword
            }
        });

        await redisClient.del(this.getResetKey(email));
        await redisClient.del(this.getTokenKey(token));

        return true;
    }
}


