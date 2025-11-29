import { redisClient } from '../config/redis';
import env from '../config/env';

export const isUserLocked = async (userId: string): Promise<boolean> => {
    const locked = await redisClient.get('lockout:' + userId);
    return locked === 'true';
}

export const increaseFailedAttempts = async (userId: string): Promise<number> => {
    const attemptsKey = `attempts:${userId}`;
    const attempts = await redisClient.incr(attemptsKey);

    if (attempts === 1) {
        await redisClient.expire(attemptsKey, env.LOCKOUT_TIME ? parseInt(env.LOCKOUT_TIME) / 1000 : 600);
    }

    if (attempts >= (env.MAX_ATTEMPTS ? parseInt(env.MAX_ATTEMPTS) : 7)) {
        await redisClient.set(`lockout:${userId}`, 'true', 'EX', env.LOCKOUT_TIME ? parseInt(env.LOCKOUT_TIME) / 1000 : 600);
    }

    return attempts;
}

export const resetFailedAttempts = async (userId: string): Promise<void> => {
    await redisClient.del('attempts:' + userId);
}
