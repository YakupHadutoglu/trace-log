import { Router } from 'express';
import * as smsController from '../controllers/sms.controller';
import { requireAuth } from '../middlewares/auth'; // Auth is required because user ID is required

const router = Router();

router.post('/send', requireAuth, smsController.sendPhoneVerification);

router.post('/check', requireAuth, smsController.verifyPhoneCode);

export default router;
