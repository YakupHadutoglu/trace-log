import { Router } from 'express';
import * as AuthController from '../auth/auth.controller';
import { validate } from '../../middlewares/validate';
import { registerSchema } from './register.schema';
import { loginSchema } from './login.schema';
import { requireAuth } from '../../middlewares/auth';
import noCache from '../../middlewares/noCache';
import { verifyToken } from '../../middlewares/requireEmailVerified';
import { forgotPassword, resetPassword } from '../auth/auth.controller';

const router: Router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);
router.patch('/change-password', noCache, requireAuth, AuthController.changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
