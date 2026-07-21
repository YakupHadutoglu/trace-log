import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import env from '../../config/env';
import { prisma } from '../../config/prisma';
import { redisClient } from '../../config/redis';
import { AuthService } from '../auth/auth.service';
import transporter from '../../config/mail';
import { parse } from 'path';
import { id } from 'zod/v4/locales';

export default class VerifyService {
    static async sendVerificationEmail(user: { id: number | string, email: string, name?: string }): Promise<void> {
        const token = uuidv4();

        await redisClient.set(`email_verify:${token}`, user.id.toString(), 'EX', 900);

        const link = `${env.API_URL}/verify/confirm?token=${token}`;

        const mailOptions = {
            from: `"Log Trace Service" <${env.hostName}>`,
            to: user.email,
            subject: 'E-posta Doğrulama',
            html: `<p>Merhaba ${user.name || ''},</p>
                <p>Hesabını doğrulamak için tıkla: <a href="${link}">Doğrula</a></p>
                <p>Bu bağlantı 15 dakika içinde geçersiz olacaktır.</p>
                <p>Teşekkürler!</p>`,
        }

        const info = await transporter.sendMail(mailOptions) as any;
        console.log(`veritification email sent to ${user.email}`);
        console.log(`Vertificatiomn email sent: %s, ${info.messageId}`);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    static async verifyEmailAndLogin(token: string) {
        const userId = await redisClient.get(`email_verify:${token}`);

        if (!userId) throw new Error('Doğrulama bağlantısı geçersiz veya süresi dolmuş.');

        const user = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { approvedStatus: true } as any
        });

        await redisClient.del(`email_verify:${token}`);

        const sessionData = await AuthService.createSession(user.id, {
            name: user.name,
            surname: user.surname,
            email: user.email,
            approvedStatus: user.approvedStatus,
            isPhoneVerified: user.isPhoneVerified

        });
        return { sessionData, user }
    }
    static async sendResetPasswordEmail(email: string, token: string): Promise<void> {
        const link = `${env.API_URL || 'http://localhost:3001'}/auth/reset-password?token=${token}`;

        const mailOptions = {
            from: `"Log Trace Service" <${env.hostName}>`,
            to: email,
            subject: 'Şifre Sıfırlama İsteği',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
                    <h2>Şifre Sıfırlama Talebi</h2>
                    <p>Hesabınız için bir şifre sıfırlama talebi aldık. Şifrenizi yenilemek için aşağıdaki butona tıklayın:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${link}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Şifremi Sıfırla</a>
                    </div>
                    <p>Bu bağlantı 30 dakika boyunca geçerlidir. Eğer bu talebi siz yapmadıysanız, bu e-postayı güvenle görmezden gelebilirsiniz.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 0.8em; color: #777;">Bağlantı çalışmıyorsa bu adresi tarayıcınıza yapıştırın: <br> ${link}</p>
                </div>
            `,
        };

        try {
            const info = await transporter.sendMail(mailOptions) as any;
            console.log(`[Reset Mail] Sent to ${email}: ${info.messageId}`);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (error) {
            console.error(`[Reset Mail Error] Failed to send email to ${email}:`, error);
            throw new Error('E-posta gönderimi sırasında bir hata oluştu.');
        }
    }
}
