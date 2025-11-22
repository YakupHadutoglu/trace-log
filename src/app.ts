import express, { Request, Response } from 'express';

import { connectMongo } from './config/mongo';
import { prisma } from './config/prisma';
import { redisClient } from 'config/redis';

const app = express();

app.get('/', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

export async function start() {
    await connectMongo();
    redisClient.set("online", "true");
}

export default app;
