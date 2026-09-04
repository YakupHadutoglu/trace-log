import { Request, Response } from 'express';
import { LogService } from './log.service';
import { AnalyticsService } from '../stats-engine/analytics.service';
import { success } from 'zod';

export const ingestBatchLogs = async (req: Request, res: Response) => {
    try {
        const apiKeyheader = req.headers['authorization'] || req.headers['Authorization'];
        const projectId = req.headers['x-project-id'] || req.headers['X-Project-Id'];
        const logs = req.body;
        if (!apiKeyheader || !projectId) {
            return res.status(401).json({
                success: false,
                message: 'Missing Authorization or x-project-id header'
            });
        }

        if (!Array.isArray(logs)) {
            return res.status(400).json({
                success: false,
                message: 'Payload must be an array of logs'
            })
        }

        // await LogService.createLog({
        //     projectId: projectId as string,
        //     apiKey: apiKeyheader as string,
        //     level: logData.level,
        //     message: logData.message,
        //     metadata: logData.metadata,
        //     timestamp: logData.timestamp

        // });

        const result = await LogService.ingestBatch(
            projectId as string,
            apiKeyheader as string,
            logs
        );

        res.status(201).json({
            success: true,
            message: 'Log ingested successfully'
        });
    } catch (error: any) {
        console.error('[TraceLog Ingest Error]:', error);

        if (error.message === 'PROJECT_NOT_FOUND' || error.message === 'INVALID_APII_KEY') {
            return res.status(403).json({ success: false, message: 'Unauthorized: Invalid Project ID or API Key' });
        }

        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getLogs = async (req: Request, res: Response) => {
    try {
        const projectId = req.params.publicId;

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 50;
        const level = req.query.level as string;

        const logData = await LogService.getProjectLogs(projectId, page, limit, level);

        return res.status(200).json({
            success: true,
            data: logData.logs,
            pagination: logData.pagination
        });

    } catch (error) {
        console.error('[Get Logs Error]:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error fetching logs' });
    }
};

export const getStats = async (req: Request, res: Response) => {
    try {
        const publicId = req.params.publicId;

        const statsData = await AnalyticsService.getProjectStats(publicId);

        return res.status(200).json({
            success: true,
            data: statsData
        });
    } catch (error) {
        console.error('[Get Stats Error]:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error fetching stats' });
    }
}
