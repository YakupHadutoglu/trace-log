import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { verifyAccessToken } from 'utils/token';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized! No token provided ' });

        const token = authHeader.split(' ')[1];

        const decoded = verifyAccessToken(token);

        if (!decoded) return res.status(401).json({ message: 'Unauthorized: on expired token.' });

        req.user = decoded;
        next();
    } catch (error: any) {
        console.error('Authentication Error: ', error);

        if (error instanceof TokenExpiredError) {
            return res.status(401).json({
                error: 'TokenExpired',
                message: 'Your session has expired, please log in again.'
            });
        }
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({
                errro: 'JsonWebTokenError',
                message: 'Invalid token'
            });
        }

        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
