import { prisma } from '../config/prisma';
import * as smsController from '../controllers/sms.controller';

export const currentProjectCountService = async (userId: any) => {
    const currentProjectCount = await prisma.project.count({
        where: {
            userId: userId
        }
    });
    return currentProjectCount;
}

export const newProjectService = async (name: string, platform: string, useCase: string, hashedApiKey: string, userId: number) => {
    const newProject = await prisma.project.create({
        data: {
            name: name,
            platform: platform,
            useCase: useCase,
            apiKey: hashedApiKey,
            userId: userId
        }
    });
    return newProject;
}

