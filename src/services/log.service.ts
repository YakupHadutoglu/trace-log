import { prisma } from '../config/prisma';
import { LogModel } from '../models/Log';
import { encryptApiKey, decryptApiKey } from '../utils/encryption';
import { AlarmService } from './alarm.service';

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
                publicId: payload.projectId
            }
        });

        if (!project) throw new Error('PROJECT_NOT_FOUND');

        const decryptedDbKey = decryptApiKey(project.apiKey);

        if (cleanApiKey !== decryptedDbKey) throw new Error('INVALID_APII_KEY');

        const newLog = await LogModel.create({
            projectId: project.publicId,
            level: payload.level,
            message: payload.message,
            metadata: payload.metadata || {},
            timestamp: new Date(payload.timestamp)
        });

        AlarmService.processLogAndTriggerAlarms(newLog).catch(err => console.error('[LogService | AlarmService] alarm error - error:', err));

        return newLog;
    }

    static async getProjectLogs(projectId: string, page: number = 1, limit: number = 50, level?: string) {
        const query: any = { projectId: projectId };

        if (level) {
            query.level = level;
        }

        const skip = (page - 1) * limit;

        const [logs, totalCount] = await Promise.all([
            LogModel.find(query)
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            LogModel.countDocuments(query)
        ]);

        return {
            logs,
            pagination: {
                totalLogs: totalCount,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                limit: limit
            }
        };
    }
}
