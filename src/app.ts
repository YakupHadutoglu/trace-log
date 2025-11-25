import express, { Request, Response } from 'express';

import { connectMongo } from './config/mongo';
import { prisma } from './config/prisma';
import { redisClient } from 'config/redis';
import cookieParser from 'cookie-parser'

import auth from './routers/index';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(auth);

app.get('/', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

export async function start() {
    await connectMongo();
    redisClient.set("online", "true");
}

export default app;
