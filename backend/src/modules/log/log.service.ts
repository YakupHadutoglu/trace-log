import { prisma } from '../../config/prisma';
import { LogModel } from '../../models/Log';
import { encryptApiKey, decryptApiKey } from '../../utils/encryption';
import { AlarmService } from '../alarm/alarm.service';
import { logBufferService } from './logBuffer.service';

interface IncomingLog {
    projectId: string;
    apiKey: string;
    level: 'info' | 'warn' | 'error' | 'fatal' | 'debug';
    message: string;
    metadata?: any;
    timestamp: Date;
    timeStamp?: Date | string; //! For case compatibility in SDK
}

export class LogService {
    static async ingestBatch(projectId: string, apiKey: string, logs: IncomingLog[]) {
        const cleanApiKey = apiKey.replace('ApiKey ', '').replace('Bearer ', '').trim();

        const projectIdNum = parseInt(projectId, 10);
        const project = await prisma.project.findUnique({
            where: {
                publicId: projectId
            }
        });

        if (!project) throw new Error('PROJECT_NOT_FOUND');

        const decryptedDbKey = decryptApiKey(project.apiKey);

        if (cleanApiKey !== decryptedDbKey) throw new Error('INVALID_APII_KEY');

        // const LogData = {
        //     projectId: project.publicId,
        //     level: payload.level,
        //     message: payload.message,
        //     metadata: payload.metadata || {},
        //     timestamp: new Date(payload.timestamp)
        // };

        logs.forEach(log => {
            const LogData = {
                projectId: project.publicId,
                level: log.level,
                message: log.message,
                metadata: log.metadata || {},
                timestamp: new Date(log.timeStamp || log.timestamp || new Date())
            };
            logBufferService.addLog(LogData)

            AlarmService.processLogAndTriggerAlarms(LogData).catch(err => console.error('[LogService | AlarmService] alarm error - error:', err));
        });

        return {status: 'queued', projectId: project.publicId};
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
