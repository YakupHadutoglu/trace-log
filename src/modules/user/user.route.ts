import { Router } from 'express';
import { getUserProfile, updateProfile } from '../user/user.controller';
import { requireAuth } from '../../middlewares/auth';
import { verifyToken } from '../../middlewares/requireEmailVerified';
import noCache from '../../middlewares/noCache';

const router: Router = Router();

router.get('/me', noCache, requireAuth, verifyToken, getUserProfile);
router.patch('/update', noCache, requireAuth, verifyToken, updateProfile);

export default router;
