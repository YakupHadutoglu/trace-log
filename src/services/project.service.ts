import { prisma } from '../config/prisma';

export const currentProjectCountService = async (userId: any) => {
    const currentProjectCount = await prisma.project.count({
        where: {
            userId: userId
        }
    });
    return currentProjectCount;
}

export const newProjectService = async (name: string, platform: string, useCase: string, apiKey: string, userId: number) => {
    const newProject = await prisma.project.create({
        data: {
            name: name,
            platform: platform,
            useCase: useCase,
            apiKey: apiKey,
            userId: userId
        }
    });
    return newProject;
}

