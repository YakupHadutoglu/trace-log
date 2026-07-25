import { redisClient } from '../../config/redis';
import env from '../../config/env';

const SMS_EXPIRY = env.SMS_EXPIRY;

export const smsService = {
    async generateAndSaveCode(userId: number, phoneNumber: string) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        const key = `sms_verify:${userId}`;
        await redisClient.set(key, code, "EX", SMS_EXPIRY ? parseInt(SMS_EXPIRY) / 1000 : 300);

        console.log(`📨 [SMS SERVICE] ${phoneNumber} için üretilen kod: ${code}`);

        return code;
    },
    async getVerificationCode(userId: string): Promise<string | null> {
        const key = `sms_verify:${userId}`;
        return await redisClient.get(key);
    },
    async deleteVerificationCode(userId: string) {
        const key = `sms_verify:${userId}`;
        await redisClient.del(key);
    }
}
