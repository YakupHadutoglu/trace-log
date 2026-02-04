import { Router } from 'express';
import noCache from 'middlewares/noCache';
import * as ProjectController from '../controllers/project.controller';
import * as smsController from '../controllers/sms.controller';
import { requireAuth } from 'middlewares/auth';
import { smsVerified } from '../middlewares/smsVerifided';
import { verifyToken } from "../middlewares/requireEmailVerified";

const router: Router = Router();

router.post('/create', noCache, requireAuth, verifyToken, smsVerified, ProjectController.createProject);

export default router;
