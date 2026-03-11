import { Router } from 'express';
import { ingestLog, getLogs} from '../controllers/log.controller';

import { requireAuth } from '../middlewares/auth';
import { verifyToken } from '../middlewares/requireEmailVerified';
import { requireProjectOwner } from '../middlewares/requireProjectOwner';

const router = Router();

router.post('/ingest', ingestLog);
router.get('/:projectId', requireAuth, verifyToken, requireProjectOwner, getLogs);

export default router;
