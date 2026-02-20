import { Router } from 'express';
import auth from './auth.route';
import verify from './verify.routes';
import project from './project.route';
import sms from './sms.route';
import log from './log.route';

const router = Router();

router.use('/auth', auth);
router.use('/verify', verify);
router.use('/sms', sms);
router.use('/project', project);
router.use('/log', log);

export default router;

