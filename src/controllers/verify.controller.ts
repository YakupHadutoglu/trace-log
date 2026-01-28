import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import VerifyService from '../services/verify.service';
import { AuthService } from "../services/auth.service";
import env from "../config/env";
import { access } from "node:fs";

export const confirmVertification = async (req: Request, res: Response) => {
    try {
        const { token } = req.query;

        if (!token || typeof token !== 'string') return res.status(400).json({ message: "Invalid verification link." });

        const { sessionData , user } = await VerifyService.verifyEmailAndLogin(token);

        res.cookie('accessToken', sessionData.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', sessionData.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie('csrfToken', sessionData.csrf, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.send(`
            <html>
                <body style="font-family:sans-serif; text-align:center; padding-top:50px;">
                    <h1 style="color:green;">✅ Doğrulama Başarılı!</h1>
                    <p>Hesabınız onaylandı ve giriş yapıldı.</p>
                    <p>Artık API'yi kullanabilirsiniz.</p>
                </body>
            </html>
        `);

        console.log('User verified and logged in via email confirmation.' , sessionData);
        const { csrf, access, refresh } = sessionData;
        const accessPayload = jwt.decode(access);
        const refreshPayload = jwt.decode(refresh);
        console.log('Access token payload:' , accessPayload);
        console.log('Refresh token payload:', refreshPayload);

        console.log('\n\n----------------------------------------------------------------');
        console.log(`✅ [SİSTEM] Kullanıcı doğrulandı: ${user.email || 'Bilinmiyor'}`);
        console.log('🔒 [GÜVENLİK] "Graceful Session Termination" protokolü simüle ediliyor...');
        console.log('----------------------------------------------------------------\n');

        let counter = 5;

        const setIntervalContDown = setInterval(async () => {
            process.stdout.write(`\r⏳ Oturum kapatılıyor: ${counter} saniye...  `);

            counter--;

            if(counter < 0) {
                clearInterval(setIntervalContDown);

                try {
                    await AuthService.deleteSession(sessionData.refresh);

                    console.log('\n\n🚫 [SİSTEM] SÜRE DOLDU.');
                    console.log('💥 [ACTION] Redis Session kaydı SİLİNDİ.');
                    console.log('👋 [ACTION] Kullanıcı başarıyla logout edildi.');
                    console.log('----------------------------------------------------------------\n');
                } catch (error) {
                    console.error('Verification Logout Error: ', error);
                }
            }
        }, 1000);

    } catch (error) {
        console.error('Verification Error:', error);
        return res.status(400).send(`Doğrulama başarısız: ${error}`);
    }
}

export const resendVerification = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await AuthService.findUserByEmail(email);

        if (user && !(user as any).approvedStatus) {
            await VerifyService.sendVerificationEmail(user);
        }

        return res.json({ message: 'Eğer kayıtlıysa doğrulama maili gönderildi.' });
    } catch (err) {
        return res.status(500).json({ message: 'Bir hata oluştu.' });
    }
};
