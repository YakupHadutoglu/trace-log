import dotenv from 'dotenv';
dotenv.config();

type Env = {
    PORT: string | undefined;
}

const env = {
    PORT: process.env.PORT || 3000
};

export default env;
