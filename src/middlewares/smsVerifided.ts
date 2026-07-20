import { Request, Response, NextFunction } from 'express';
import { smsService } from '../modules/sms/sms.service';

export const smsVerified = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Auth Missing' });
        console.log('🧪 USER:', req.user);
        console.log('📱 phoneNumber:', req.user.phoneNumber);
        console.log('📞 typeof:', typeof req.user.phoneNumber);

        if (req.user.isPhoneVerified === true) return next();

        console.log(`[AUTO-SMS] Kullanıcı (${req.user.email}) onaysız.`);

        if (req.user.phoneNumber) {
            await smsService.generateAndSaveCode(Number(req.user.id), req.user.phoneNumber);
        }

        return res.status(403).json({
            error: 'PhoneNotVerified',
            action: 'OPEN_OTP_MODAL',
            message: 'Telefon onayı gerekli. Kod gönderildi.',
            data: { phoneNumber: req.user.phoneNumber }
        });

    } catch (error: any) {
        console.error('Middleware Error:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
