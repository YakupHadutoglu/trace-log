import { prisma } from '../config/prisma';
import * as smsController from '../controllers/sms.controller';

import { encryptApiKey } from 'utils/encryption';
import crypto from 'crypto';

import env from 'config/env';
import { redisClient } from 'config/redis';
import { throwDeprecation } from 'process';

import * as encryption from  '../utils/encryption'
import { describe } from 'zod/v4/core';

const limit = env.PROJECT_LIMIT || 3; // Default to 3 if not set

const getCacheKey = (userId: number) => `user:${userId}:projectCount`;

export const getProjectCount = async (userId: number): Promise<Number> => {
    const cacheKey = getCacheKey(userId);

    const cacheCount = await redisClient.get(cacheKey.toString());

    if (cacheCount) return parseInt(cacheCount);

    const count = await prisma.project.count({
        where: {
            userId: userId
        }
    });

    await redisClient.set(cacheKey.toString(), count.toString(), "EX", 60);
    return count;
}

export const newProjectService = async (userId: number , name: string, platform: string, useCase: string) => {
    const currentProjectCount = await getProjectCount(userId);
    if (currentProjectCount >= limit) throw new Error("LIMIT_REACHED");

    const randomPart = crypto.randomBytes(16).toString('hex');
    const rawApiKey = `tracelog_sk_${randomPart}`;
    const encryptedApiKey = encryptApiKey(rawApiKey);

    const randomPublicId = crypto.randomBytes(5).toString('hex');
    const newPublicId = `prj_${randomPublicId}`;

    const newProject = await prisma.project.create({
        data: {
            name: name,
            platform: platform,
            useCase: useCase,
            apiKey: encryptedApiKey,
            userId: userId,
            verificationKeyStatus: false,
            publicId: newPublicId,
        }
    });

    const newcount = await prisma.user.update({
        where: { id: userId },
        data: {
            projectCount: {
                increment: 1
            }
        }
    });

    const keyExists = await redisClient.exists(getCacheKey(userId));
    if(keyExists) await redisClient.incr(getCacheKey(userId));
    return {
        newProject, rawApiKey
    };
}

export const getAllProjectService = async (id: number) => {
    const allProject = await prisma.project.findMany({
        where: {
            userId: id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return allProject;
}

export const getProjectService = async (projectId: number) => {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    });
    return project;
}

export const apiKeyVerifiedService = async (publicId: string, userId: number , apiKey:string): Promise<boolean> => {
    const project = await prisma.project.findUnique({
        where: {
            publicId: publicId
        },
        select: {
            apiKey: true,
            userId: true
        }
    });

    if (!project) throw new Error("api key not found");

    if (project.userId !== userId) {
        throw new Error("UNAUTHORIZED_ACCESS");
    }

    const decryptedDbKey = encryption.decryptApiKey(project.apiKey);

    if (apiKey !== decryptedDbKey) {
        throw new Error("The API key you entered is not the same as your current API key.");
    }

    const keyStatusUpdate = await prisma.project.update({
        where: {
            publicId: publicId,
        },
        data: {
            verificationKeyStatus: true
        }
    });
    return true;
}
