import { AuthService } from "../auth/auth.service";
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { COOKIE_OPTIONS } from "../../config/cookie";
import { access } from "fs";
import { prisma } from "../../config/prisma";
import { smsService } from "../sms/sms.service";
import { success } from "zod";
import { requireAuth } from "middlewares/auth";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, surname, email, password, phoneNumber } = req.body;

        if (!name || !surname || !email || !password || !phoneNumber) return res.status(400).json({ message: "All fields are required." });

        const existingUser = await AuthService.findUserByEmail(email);
        if (existingUser) return res.status(409).json({ message: "User with this email already exists." });

        const user = await AuthService.createUser({ email, name, surname, password, approvedStatus: false, phoneNumber, isPhoneVerified: false });

        const authHeader = req.cookies['accessToken'];
        console.log('Access Token from cookies:', authHeader);

        return res.status(201).json({ ok: true, user });
    } catch (error) {
        console.error('Registration Error:', error);
        return res.status(500).json({ message: "Internal server error." });
    }

}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "All fields are required." });

        const { access, refresh, csrf, user } = await AuthService.login(email, password);

        res.cookie('refreshToken', refresh, COOKIE_OPTIONS);
        res.cookie('csrfToken', csrf, { ...COOKIE_OPTIONS, httpOnly: false });
        res.cookie('accessToken', access, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        });
        console.log('user logged in succesfully:', user);
        return res.json({ accessToken: access, user });

    } catch (error: any) {
        console.error('Login Error:', error.message);

        if (error.message.includes('kilitlendi')) {
            return res.status(429).json({ message: error.message }); // 429 Too Many Requests
        }

        if (error.message === 'Invalid Credentials' || error.message === 'User Not Found') {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        return res.status(500).json({ message: "Login Failed! Internal server error." });
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies['refreshToken'];
        const csrfToken = req.headers['x-csrf-token'];

        if (!refreshToken || !csrfToken) return res.status(401).json({ message: "Unauthorized." });

        const newTokens = await AuthService.refreshSession(refreshToken, csrfToken as string);

        res.cookie('refreshToken', newTokens.refresh, COOKIE_OPTIONS);
        res.cookie('csrfToken', newTokens.csrf, { ...COOKIE_OPTIONS, httpOnly: false });

        return res.json({ accessToken: newTokens.access });

    } catch (error) {
        console.error('Refresh Error:', error);
        return res.status(403).json({ message: "Session invalid or expired." });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies['refreshToken'];
        if (refreshToken) await AuthService.deleteSession(refreshToken);
        res.clearCookie('refreshToken', COOKIE_OPTIONS);
        res.clearCookie('csrfToken', { ...COOKIE_OPTIONS, httpOnly: false });

        console.log('User loggoed out succesfully and sessionData deleted');
        return res.status(200).json({ message: "Loggeg out succesfully" });
    } catch (error) {
        console.error('Logout Error:', error);
        return res.status(500).json({ message: "Login Failed! Internal server error." });
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        const userId = Number((req as any).user.id);
        const { oldPassword, newPassword } = req.body;
        const password = await AuthService.passwordDbGet(userId);
        const currentRefreshToken = req.cookies['refreshToken'];

        if (newPassword.length < 6) return res.status(400).json({ message: "Yeni şifre en az 6 karakter olmalıdır." });

        const isMatched = await bcrypt.compare(oldPassword as string, password?.password as string);
        if (!isMatched) return res.status(401).json({ message: "Old password is incorrect." });

        await AuthService.changePassword(userId, oldPassword, newPassword);

        console.log('\n\n----------------------------------------------------------------');
        console.log(`✅ [SİSTEM] Şifre değişti. User ID: ${userId}`);
        console.log('🔒 [GÜVENLİK] Oturum sonlandırma protokolü başlatılıyor...');
        console.log('----------------------------------------------------------------\n');

        if (currentRefreshToken) {
            let counter = 5;
            const logoutTimer = setInterval(async () => {
                console.log(`⏳ Oturum kapatılıyor: ${counter}... `);

                counter--;

                if (counter < 0) {
                    clearInterval(logoutTimer);
                    try {
                        await AuthService.deleteSession(currentRefreshToken);
                        console.log('\n🚫 [SİSTEM] SÜRE DOLDU. Session Redis\'ten silindi.');
                    } catch (err) {
                        console.error('Logout Error:', err);
                    }
                }
            }, 1000);
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.clearCookie('csrfToken');

        return res.status(200).json({ message: "succesfully changed password." });
    } catch (error) {
        console.error('changed password error: ', error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: "Email is required!" });

        const resetToken = await AuthService.requestPasswordReset(email);

        //TODO: email kısmı buraya gelecek

        console.log(`[DEBUG] ${email} için sıfırlama tokenı: ${resetToken}`);

        return res.status(200).json({
            success: true,
            message: 'If the email address is registered in the system, a password reset link will be sent.'
        });
    } catch (error: any) {
        console.error('Forgot Password Error:', error.message);

        if (error.message === 'USER_NOT_FOUND') {
            return res.status(200).json({
                success: true,
                message: 'Eğer e-posta adresi sistemde kayıtlıysa, şifre sıfırlama bağlantısı gönderilecektir.'
            });
        }

        res.status(500).json({ success: false, message: 'İşlem sırasında bir hata oluştu.' });
    }
}


export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) return res.status(400).json({ message: "Token and new password are required!" });

        await AuthService.resetPasswordWithToken(token, newPassword);

        res.status(200).json({
            success: true,
            message: 'Your password has been successfully updated. You can now log in with your new password.'
        });
    } catch (error: any) {
        console.error('Reset Password Error:', error.message);

        if (error.message === 'INVALID_OR_EXPIRED_TOKEN') {
            return res.status(400).json({ message: 'Invalid or expired reset link.' });
        }

        res.status(500).json({ success: false, message: 'An error occurred while updating the password.' });
    }
}

