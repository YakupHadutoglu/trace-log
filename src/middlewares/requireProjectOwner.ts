import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { success } from 'zod';

export const requireProjectOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number((req as any).user.id);
        const projectId = Number(req.params.projectId);

        if (!projectId || isNaN(projectId)) return res.status(400).json({ message: 'Invalid Project ID' });

        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            },
            select: {
                userId: true
            }
        });

        if (!project) return res.status(404).json({ message: 'Project Not Found!' });

        if (project.userId !== userId) {
            return res.status(403).json({
                success: true,
                message: 'You cannot access someone else\'s project'
            });
        }
        next();
    } catch (error) {
        console.error('[Middleware Error - requireProjectOwner]:', error);
        res.status(500).json({ success: false, message: 'Internal server error checking project ownership' });  
    }
}
