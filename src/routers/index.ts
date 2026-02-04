import { Router } from 'express';
import auth from './auth.route';
import verify from './verify.routes';
import project from './project.route';
import sms from './sms.route';

const router = Router();

router.use('/auth', auth);
router.use('/verify', verify);
router.use('/sms', sms);
router.use('/project', project);

export default router;

