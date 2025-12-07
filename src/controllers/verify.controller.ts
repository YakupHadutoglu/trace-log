import { Request , Response } from "express";
import VerifyService from '../services/verify.service';
import { AuthService } from "../services/auth.service";
import env from "../config/env";

export const confirmVertification = async (req: Request, res: Response) => {
    try {
        const { token } = req.query;

        if (!token || typeof token !== 'string') return res.status(400).json({ message: "Invalid verification link." });

        const { sessionData } = await VerifyService.verifyEmailAndLogin(token);

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
