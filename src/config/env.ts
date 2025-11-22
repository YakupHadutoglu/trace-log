import dotenv from 'dotenv';
dotenv.config();

type Env = {
    PORT: string | undefined;
    POSTGRES_URL: string | undefined;
    MONGO_URL: string | undefined;
    REDIS_URL: string | undefined;
}

const env = {
    PORT: process.env.PORT || 3000,
    POSTGRES_URL: process.env.POSTGRES_URL,
    MONGO_URL: process.env.MONGO_URL,
    REDIS_URL: process.env.REDIS_URL,
};

export default env;
