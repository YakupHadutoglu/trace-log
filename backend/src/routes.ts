import { Router } from 'express';
import auth from './modules/auth/auth.route';
import verify from './modules/auth/verify.routes';
import project from './modules/project/project.route';
import sms from './modules/sms/sms.route';
import log from './modules/log/log.route';
import user from './modules/user/user.route';

const router = Router();

router.use('/auth', auth);
router.use('/verify', verify);
router.use('/sms', sms);
router.use('/project', project);
router.use('/log', log);
router.use('/user', user);

export default router;

