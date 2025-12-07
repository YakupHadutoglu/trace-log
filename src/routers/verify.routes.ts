import { Router } from 'express';
import * as VerifyController from '../controllers/verify.controller';
import noCache from '../middlewares/noCache';

const router: Router = Router();

router.get('/confirm', noCache, VerifyController.confirmVertification);
router.post('/resend', noCache, VerifyController.resendVerification);

export default router;


