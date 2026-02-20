import { Router } from 'express';
import { ingestLog } from '../controllers/log.controller';

const router = Router();

router.post('/ingest', ingestLog);

export default router;
