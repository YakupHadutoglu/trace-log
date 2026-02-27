import { Request, Response } from 'express';
import { LogService } from 'services/log.service';

export const ingestLog = async (req: Request, res: Response) => {
    try {
        const apiKeyheader = req.headers['authorization'] || req.headers['Authorization'];
        const projectIdHeader = req.headers['x-project-id'] || req.headers['X-Project-Id'];
        const logData = req.body;
        if (!apiKeyheader || !projectIdHeader) {
            return res.status(401).json({
                success: false,
                message: 'Missing Authorization or x-project-id header'
            });
        }
        await LogService.createLog({
            projectId: projectIdHeader as string,
            apiKey: apiKeyheader as string,
            level: logData.level,
            message: logData.message,
            metadata: logData.metadata,
            timestamp: logData.timestamp

        });

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
