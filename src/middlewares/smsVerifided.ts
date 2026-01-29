import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { verifyAccessToken } from 'utils/token';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { TokenPayload } from '../types/express/express';

const smsVerified = (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                message: 'Sunucu Hatası: SMS kontrolü öncesinde kimlik doğrulaması yapılmamış.'
            });
        }

        if (req.user.isPhoneVerified !== true) {
            console.log(`Erişim Engellendi: Kullanıcı (${req.user.email}) telefonunu doğrulamamış.`);

            return res.status(403).json({
                error: 'PhoneNotVerified', // Frontend bunu yakalayıp SMS ekranını açabilir
                message: 'Bu işlemi yapmak için lütfen telefon numaranızı doğrulayın.'
            });
        }

        next();

    } catch (error: any) {
        console.error('SMS Verification Error: ', error);
        return res.status(500).json({ message: 'Sunucu Hatası.' });
    }
};

