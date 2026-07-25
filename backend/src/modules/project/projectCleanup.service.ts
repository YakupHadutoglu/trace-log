import cron from 'node-cron';
import { prisma } from '../../config/prisma';
import { redisClient } from '../../config/redis';

import { getCacheKey , getProjectCount } from './project.service';

const cleanupTask = cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] The engine for cleaning unverified ghost projects has been activated...');

    try {
        const now = new Date();

        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(now.getDate() - 3);

        const projectsToDelete = await prisma.project.findMany({
            where: {
                verificationKeyStatus: false,
                createdAt: {
                    lte: threeDaysAgo
                }
            },
            select: {
                id: true,
                userId: true,
                publicId: true
            }
        });

        for (const project of projectsToDelete) {

            const currentCount = await getProjectCount(project.userId);

            await prisma.project.delete({
                where: {
                    id: project.id
                }
            });

            if (Number(currentCount)  > 0) {

                await prisma.user.update({
                    where: {
                        id: project.userId
                    },
                    data: {
                        projectCount: {
                            decrement: 1
                        }
                    }
                });

                const cacheKey = getCacheKey(project.userId);
                const keyExists = await redisClient.exists(cacheKey);

                if (keyExists) {
                    await redisClient.decr(cacheKey);
                }
            }
        }

        console.log(`[CRON] ${projectsToDelete.length} Because the project was not verified for 3 days, it was permanently deleted and the limits were refunded.`);

    } catch (error) {
        console.error('[CRON] Error occurred during the cleaning process:', error);
    }
});

export default cleanupTask;
