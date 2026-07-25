import nodemailer from 'nodemailer';
import env from './env';

const transporter = nodemailer.createTransport({
    host: env.hostEmail,
    port: env.smtpPort ? parseInt(env.smtpPort, 10) : 587,
    secure: false,
    auth: {
        user: env.hostName,
        pass: env.hostPassword
    },
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    rateLimit: 10
});
export default transporter;
