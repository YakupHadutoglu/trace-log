import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { success } from 'zod';

export const requireProjectOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number((req as any).user.id);

        // Get the parameter from the route definition (Whichever is available)
        const publicId = req.params.publicId; //New system (prj_...)
        const projectId = req.params.projectId; // Old system (33...)

        if (!publicId && !projectId) {
            return res.status(400).json({ message: 'Project ID or Public ID is required in URL' });
        }

        let project;

        // Scenario 1: If "publicId" (prj_...) is used in the URL
        if (publicId) {
            project = await prisma.project.findUnique({
                where: { publicId: publicId as string },
                select: { userId: true }
            });
        }
        //Scenario 2: If the old-school "projectId" (number) is still used in the URL
        else if (projectId) {
            const parsedId = Number(projectId);
            if (isNaN(parsedId)) return res.status(400).json({ message: 'Invalid Project ID format' });

            project = await prisma.project.findUnique({
                where: { id: parsedId },
                select: { userId: true }
            });
        }

        if (!project) return res.status(404).json({ message: 'Project Not Found!' });

        //If the owner of the project is not the requesting user (in the token)
        if (project.userId !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You cannot access someone else\'s project'
            });
        }
        next();
    } catch (error) {
        console.error('[Middleware Error - requireProjectOwner]:', error);
        res.status(500).json({ success: false, message: 'Internal server error checking project ownership' });
    }
}
