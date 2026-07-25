import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import crypto from 'crypto';

import { newProjectService, apiKeyVerifiedService, getAllProjectService, getProjectService } from './project.service';


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
                publicId: result.newProject.publicId,
                name: result.newProject.name,
                platform: result.newProject.platform,
                useCase: result.newProject.useCase,
                createdAt: result.newProject.createdAt,
                apiKey: result.rawApiKey,
                verificationKeyStatus: false,
            }
        });
        res.status(201).json({
            message: 'Project created successfully.',
            project: {
                id: result.newProject.id,
                publicId: result.newProject.publicId,
                name: result.newProject.name,
                platform: result.newProject.platform,
                useCase: result.newProject.useCase,
                createdAt: result.newProject.createdAt,
                apiKey: result.rawApiKey,
                verificationKeyStatus: false
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

export const getAllProject = async (req: Request, res: Response) => {
    try {
        const userId = Number((req as any).user.id);
        if (!userId) return res.status(401).json({ message: 'Authorization not found' });
        const allProject = await getAllProjectService(userId);
        console.log(allProject);
        res.status(200).json({ allProject });
    } catch (error) {
        console.log('An error was encountered while fetching all projects', error);
        res.status(500).json({ message: 'internal server error', error })
    }
}

export const getProject = async (req: Request, res: Response) => {
    try {
        const projectId = Number(req.params.projectId);
        const userId = Number((req as any).user.id);


        if (!projectId) return res.status(404).json({ message: 'Project not found!' });

        const project = await getProjectService(projectId);
        console.log(projectId);
        console.log(userId);
        console.log(project);

        if (project?.userId !== userId) return res.status(403).json({ message: 'You cannot access someone else"s project' });

        console.log(project, 'Current selected individual project content');
        res.status(200).json({ project, message: 'Current selected individual project content' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error })
    }
}

export const apiKeyVerifiedProject = async (req: Request, res: Response) => {
    try {
        const { apiKey } = req.body;
        const userId = Number((req as any).user.id);

        const targetId = req.params.publicId || req.params.projectId;

        if (!apiKey) return res.status(400).json({ message: 'apiKey is not defined in body' });
        if (!targetId) return res.status(400).json({ message: 'Project ID is missing from URL' });

        const apiKeyVerifieService = await apiKeyVerifiedService(targetId as string, userId, apiKey);

        console.log('apiKey verified successfully');

        res.status(200).json({
            message: 'apiKey verified successfully',
            apiKeyVerifieService
        });

    } catch (error: any) {
        console.error('Verification Error:', error.message);

        if (error.message === "api key not found") {
            return res.status(404).json({ message: "Project not found." });
        }
        if (error.message === "UNAUTHORIZED_ACCESS") {
            return res.status(403).json({ message: "You do not have permission to edit this project." });
        }

        if (error.message.includes("The API key you entered is not the same as your current API key.")) {
            return res.status(401).json({ message: "The API Key you entered is incorrect." });
        }

        if (error.message.includes("Security Violation")) {
            return res.status(410).json({ message: error.message });
        }

        res.status(500).json({ message: 'Internal server error' });
    }
}

