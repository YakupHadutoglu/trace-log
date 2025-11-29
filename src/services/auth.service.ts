import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../config/prisma';
import { redisClient } from 'config/redis';
import env from '../config/env';
import { CreateUserDto } from '../types/user';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/token';
import { json } from 'body-parser';
import { isUserLocked, increaseFailedAttempts, resetFailedAttempts } from '../utils/lockout';

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
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                surname: true,
                email: true,
            }
        });
        return newUser;
    }

    static async login(email: string, password: string) {
        const user = await this.findUserByEmail(email);
        if (!user) throw new Error('User Not Found');
        const userIdStr = user.id.toString();

        const locked = await isUserLocked(userIdStr);
        if (locked) throw new Error('Account is temporarily locked due to multiple failed login attempts. Please try again later.');

        const isMastched = await bcrypt.compare(password, user.password);
        if (!isMastched) {
            await increaseFailedAttempts(userIdStr);
            throw new Error('İnvalid Credentials');
        }

        await resetFailedAttempts(userIdStr);

        return await this.createSession(user.id ,  { name: user.name, surname: user.surname , email: user.email });
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

        if (!csrfHeader || record.csrf !== csrfHeader) throw new Error('CSRF token mismatch.: CSRF Token çalınmış olabilir.');

        await this.deleteSession(refreshToken);

        return await this.createSession(record.userId);
    }

}


