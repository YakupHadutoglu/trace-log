import jwt from 'jsonwebtoken';
import env from '../config/env';
import { Request, Response, NextFunction } from 'express';
import { TokenPayload } from '../types/express/express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;

        if (req.cookies && req.cookies['accessToken']) {
            token = req.cookies['accessToken'];
        }

        if (!token && req.headers['authorization']) {
            const authHeader = req.headers['authorization'];
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }
        }

        if (!token) {
            return res.status(401).json({ message: 'Yetkisiz Erişim: Token bulunamadı.' });
        }

        jwt.verify(token, env.accessTokenSecret || 'secret_key', (err, decoded) => {
            if (err) {
                console.error('Token Hatası:', err.message);
                return res.status(403).json({ message: 'Geçersiz veya Süresi Dolmuş Token.' });
            }

            const userPayload = decoded as TokenPayload;

            console.log('Kontrol edilen kullanıcı payload:', userPayload);

            if (userPayload.approvedStatus !== true) {
                return res.status(403).json({
                    message: 'Erişim Reddedildi: Hesabınız henüz onaylanmamış. Lütfen e-postanızı kontrol edin.'
                });
            }

            req.user = userPayload;

            next();
        });

    } catch (error) {
        console.error('Middleware Beklenmeyen Hata:', error);
        return res.status(500).json({ message: 'Sunucu Hatası.' });
    }
}
