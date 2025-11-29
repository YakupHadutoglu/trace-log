import dotenv from 'dotenv';
import { access } from 'node:fs/promises';
dotenv.config();

type Env = {
    PORT: string | undefined;
    POSTGRES_URL: string | undefined;
    MONGO_URL: string | undefined;
    REDIS_URL: string | undefined;
    NODE_ENV: string | undefined;
    accessTokenSecret: string | number;
    refreshTokenSecret: string | number;
    accessTokenExpiresIn: string | number;
    refreshTokenExpiresIn: string | number;
    MAX_ATTEMPTS: string | undefined;
    LOCKOUT_TIME: string | undefined;

}

const env = {
    PORT: process.env.PORT || 3000,
    POSTGRES_URL: process.env.POSTGRES_URL,
    MONGO_URL: process.env.MONGO_URL,
    REDIS_URL: process.env.REDIS_URL,
    NODE_ENV: process.env.NODE_ENV,
    accessTokenSecret: process.env.accessTokenSecret || 'secret-fallback',
    refreshTokenSecret: process.env.refreshTokenSecret || 'secret-fallback',
    accessTokenExpiresIn: process.env.accessTokenExpiresIn || '15m',
    refreshTokenExpiresIn: process.env.refreshTokenExpiresIn || '7d',
    MAX_ATTEMPTS: process.env.MAX_ATTEMPTS,
    LOCKOUT_TIME: process.env.LOCKOUT_TIME,

};

export default env;
