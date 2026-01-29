import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { verifyAccessToken } from 'utils/token';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;

        if (req.cookies && req.cookies['accessToken']) {
            token = req.cookies['accessToken'];
        }

        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Yetkisiz Erişim: Oturum bulunamadı.' });
        }

        const decoded = verifyAccessToken(token);

        if (!decoded) return res.status(401).json({ message: 'Geçersiz Token.' });

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
