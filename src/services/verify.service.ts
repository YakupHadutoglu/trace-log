import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import env from '../config/env';
import { prisma } from '../config/prisma';
import { redisClient } from '../config/redis';
import { AuthService } from '../services/auth.service';
import transporter from '../config/mail';
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

        const info = await transporter.sendMail(mailOptions);
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
}
