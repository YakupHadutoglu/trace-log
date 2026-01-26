import { redisClient } from '../config/redis';
import env from '../config/env';


const SMS_EXPIRY = env.SMS_EXPIRY;

export const smsService = {
    async saveSmsVerificationCode(userId: number, code: string) {
        const key = `sms_verify:${userId}`;
        await redisClient.set(key, code, "EX" , SMS_EXPIRY ? parseInt(SMS_EXPIRY) / 1000 : 300);
    },
    async getVerificationCode(userId: string):Promise<string | null> {
        const key = `sms_verify:${userId}`;
        return await redisClient.get(key);
    },
    async deleteVerificationCode(userId: string) {
        const key = `sms_verify:${userId}`;
        await redisClient.del(key);
    }
}
