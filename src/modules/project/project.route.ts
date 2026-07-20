import { Router } from 'express';
import noCache from 'middlewares/noCache';
import * as ProjectController from '../project/project.controller';
import * as smsController from '../sms/sms.controller';
import { requireAuth } from 'middlewares/auth';
import { smsVerified } from '../../middlewares/smsVerifided';
import { verifyToken } from "../../middlewares/requireEmailVerified";

import { apiKeyVerifiedMd } from 'middlewares/apiKeyVerified';
import { smsService } from '../sms/sms.service';

const router: Router = Router();

router.post('/create', noCache, requireAuth, verifyToken, smsVerified, ProjectController.createProject);
router.get('/all-project', noCache, requireAuth, verifyToken, smsVerified, ProjectController.getAllProject);
router.get('/:projectId/content', noCache, requireAuth, verifyToken, ProjectController.getProject);
router.patch('/:projectId/verify', noCache, requireAuth, verifyToken, ProjectController.apiKeyVerifiedProject);

export default router;
