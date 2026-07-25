import { redisClient } from '../config/redis';
import env from '../config/env';

export const isUserLocked = async (userId: string): Promise<boolean> => {
    const locked = await redisClient.get(`lockout:${userId}`);
    return locked === 'true';
};

export const increaseFailedAttempts = async (userId: string): Promise<number> => {
    const attemptsKey = `attempts:${userId}`;
    const attempts = await redisClient.incr(attemptsKey);

    const lockoutMs = env.LOCKOUT_TIME ? parseInt(env.LOCKOUT_TIME, 10) : 600000;
    const lockoutSeconds = Math.ceil(lockoutMs / 1000);

    const maxAttempts = env.MAX_ATTEMPTS
        ? parseInt(env.MAX_ATTEMPTS, 10)
        : 7;

    if (attempts === 1) {
        await redisClient.expire(attemptsKey, lockoutSeconds);
    }

    if (attempts >= maxAttempts) {
        await redisClient.set(
            `lockout:${userId}`,
            'true',
            'EX',
            lockoutSeconds
        );
    }

    return attempts;
};

export const resetFailedAttempts = async (userId: string): Promise<void> => {
    await redisClient.del(`attempts:${userId}`);
};
