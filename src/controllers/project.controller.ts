import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import crypto from 'crypto';

import { currentProjectCountService , newProjectService } from '../services/project.service';

const generateApiKey = () => {
    const random = crypto.randomBytes(16).toString('hex');
    return `tracelog_sk_${random}`;
}

export const createProject = async (req: Request, res: Response) => {
    try {
        const userId = Number((req as any).user.id);
        const { name, platform, useCase } = req.body;

        if (!name || !platform || !useCase) return res.status(400).json({ message: "Name, platform and useCase required." });

        const currentProjectCount = await currentProjectCountService(userId)

        console.log("Current project count:", currentProjectCount);

        if (currentProjectCount >= 3) {
            return res.status(403).json({
                error: 'Limited reached',
                message: 'You can create a maximum of 3 projects with the free plan. You have reached the limit.'
            });
        }

        const apiKey = generateApiKey();

        const newProject = await newProjectService(name, platform, useCase, apiKey, userId);

        res.status(201).json({
            message: 'Project created successfully.',
            project: {
                id: newProject.id,
                name: newProject.name,
                platform: newProject.platform,
                useCase: newProject.useCase,
                apiKey: newProject.apiKey,
                createdAt: newProject.createdAt,
            }
        })
    } catch (error) {

    }
}
