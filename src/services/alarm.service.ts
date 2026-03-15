import { prisma } from '../config/prisma';
import { redisClient } from '../config/redis';
import { DiscordService } from './discord.service';

export class AlarmService {
    static async processLogAndTriggerAlarms(logData: any) {
        try {
            const activeRules = await prisma.alarmRule.findMany({
                where: {projectId: logData.projectId}
            });

            if (!activeRules || activeRules.length === 0) return;

            for (const rule of activeRules) {
                //* Şart sağlanıyor mu? (Gelen log seviyesi, kuraldaki seviyeye eşit mi?)
                if (rule.conditionSeverity && rule.conditionSeverity !== logData.level) continue;

                //* Spam Protection (Redis)
                const redisKey = `alarm_cooldown:${rule.id}`;
                const isCooldownActive = await redisClient.get(redisKey);
                if (isCooldownActive) continue;

                //* Disbrution (Fan-Out)
                const disbatchTasks = [];
                if (rule.sendDiscord && rule.discordWebHookUrl) {
                    disbatchTasks.push(DiscordService.sendAlert(rule.discordWebHookUrl, logData, rule.name));
                }
                await Promise.allSettled(disbatchTasks);

                //* Once submitted, it will be sent to Redis as a file.
                const ttlSeconds = rule.cooldownMinutes * 60;
                await redisClient.set(redisKey, 'locked', 'EX', ttlSeconds);
            }
        } catch (error: any) {
            console.error('[AlarmService] error:', error);
        }
    }
}
