import { prisma } from '../config/prisma';
import { LogModel } from '../models/Log';
import { encryptApiKey, decryptApiKey } from '../utils/encryption';

interface CreateLogPayload {
    projectId: string;
    apiKey: string;
    level: 'info' | 'warn' | 'error' | 'fatal' | 'debug';
    message: string;
    metadata?: any;
    timestamp: Date;
}

export class LogService {
    static async createLog(payload: CreateLogPayload) {
        const cleanApiKey = payload.apiKey.replace('ApiKey ', '').trim();

        const projectIdNum = parseInt(payload.projectId, 10);
        const project = await prisma.project.findUnique({
            where: {
                id: projectIdNum
            }
        });

        if (!project) throw new Error('PROJECT_NOT_FOUND');

        const decryptedDbKey = decryptApiKey(project.apiKey);

        if (cleanApiKey !== decryptedDbKey) throw new Error('INVALID_APII_KEY');

        const newLog = await LogModel.create({
            projectId: project.id.toString(),
            level: payload.level,
            message: payload.message,
            metadata: payload.metadata || {},
            timestamp: new Date(payload.timestamp)
        });
        return newLog;
    }
}
