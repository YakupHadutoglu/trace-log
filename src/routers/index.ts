import { Router } from 'express';
import auth from './auth.route';
import verify from './verify.routes';
import project from './project.route';
import sms from './sms.route';
import log from './log.route';
import user from './user.route';

const router = Router();

router.use('/auth', auth);
router.use('/verify', verify);
router.use('/sms', sms);
router.use('/project', project);
router.use('/log', log);
router.use('/user', user);

export default router;

