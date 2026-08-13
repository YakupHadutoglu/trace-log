import { Router } from 'express';
import { ingestBatchLogs, getLogs } from './log.controller';

import { requireAuth } from '../../middlewares/auth';
import { verifyToken } from '../../middlewares/requireEmailVerified';
import { requireProjectOwner } from '../../middlewares/requireProjectOwner';
import { getStats } from './log.controller';

const router = Router();

router.post('/ingest/batch', ingestBatchLogs);
router.get('/:publicId/stats', requireAuth, verifyToken, requireProjectOwner, getStats);
router.get('/:publicId', requireAuth, verifyToken, requireProjectOwner, getLogs);

export default router;
