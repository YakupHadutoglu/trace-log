import { Router } from 'express';
import auth from './auth.route';
import verify from './verify.routes';

const router = Router();

router.use('/auth', auth);
router.use('/verify', verify);

export default router;

