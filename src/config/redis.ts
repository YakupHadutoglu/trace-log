import Redis from 'ioredis';
import env from './env';

export const redisClient = new Redis(process.env.REDUS_URL || '');

redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error' , (error) => console.error('Failed to connect to Redis' , `Redis connected Failed error => ${error}`))
