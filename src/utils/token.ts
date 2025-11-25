import jwt from 'jsonwebtoken';
import env from '../config/env';
import { TokenPayload } from 'types/express/express';
import { payload } from 'types/express/express';

export const signAccessToken = (payload: payload): string => {
    return jwt.sign(
        payload,
        env.accessTokenSecret as jwt.Secret,
        { expiresIn: env.accessTokenExpiresIn as jwt.SignOptions['expiresIn'] }
    );
}

export const signRefreshToken = (payload: payload): string => {
    return jwt.sign(
        payload,
        env.refreshTokenSecret as jwt.Secret,
        { expiresIn: env.refreshTokenExpiresIn as jwt.SignOptions['expiresIn'] }
    );
}

export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, env.accessTokenSecret as jwt.Secret) as TokenPayload
    } catch (error) {
        return null;
    }
}

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, env.refreshTokenSecret as jwt.Secret) as TokenPayload;

    } catch (error) {
        return null;
    }
}
