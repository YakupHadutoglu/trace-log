import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import crypto from 'crypto';

import { newProjectService } from '../services/project.service';

export const createProject = async (req: Request, res: Response) => {
    try {
        const userId = Number((req as any).user.id);
        const { name, platform, useCase } = req.body;

        if (!name || !platform || !useCase) {
            return res.status(400).json({ message: "Name, platform and useCase required." });
        }

        const result = await newProjectService(userId, name, platform, useCase);

        console.log(`Project created for user ${userId}. Key: ${result.rawApiKey.substring(0, 15)}...`);
        console.log({
            project: {
                id: result.newProject.id,
                name: result.newProject.name,
                platform: result.newProject.platform,
                useCase: result.newProject.useCase,
                createdAt: result.newProject.createdAt,
                apiKey: result.rawApiKey
            }
        });
        res.status(201).json({
            message: 'Project created successfully.',
            project: {
                id: result.newProject.id,
                name: result.newProject.name,
                platform: result.newProject.platform,
                useCase: result.newProject.useCase,
                createdAt: result.newProject.createdAt,
                apiKey: result.rawApiKey
            },
            warning: "Please save this API Key immediately. You won't be able to see it again!"
        });
    } catch (error) {
        console.error('Error creating project: ', error);

        if (error === 'LIMIT_REACHED') {
            return res.status(403).json({
                error: 'Limit Reached',
                message: 'You can create a maximum of 3 projects with the free plan. You have reached the limit.'
            });
        }

        res.status(500).json({ message: 'Internal server error' });
    }
}
