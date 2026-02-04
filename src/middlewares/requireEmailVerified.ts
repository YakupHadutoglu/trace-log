import { Request, Response, NextFunction } from 'express';

class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode = 500) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(500).json({ message: 'Sunucu Hatası: Auth kontrolü yapılmadan Verify çağrıldı.' });
    }

    if (req.user.approvedStatus !== true) {
        return res.status(403).json({
            error: 'EmailNotVerified',
            message: 'Erişim Reddedildi: Lütfen önce e-posta adresinizi doğrulayın.'
        });
    }

    console.log('Kontrol edilen kullanıcı payload:', req.user);

    if (req.user.approvedStatus !== true) {
        return res.status(403).json({
            error: 'EmailNotVerified',
            message: 'Erişim Reddedildi: Hesabınız henüz onaylanmamış. Lütfen e-postanızı kontrol edin.'
        });
    }

    next();

}
