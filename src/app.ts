import express, { Request, Response } from 'express';

import { connectMongo } from './config/mongo';
import { prisma } from './config/prisma';
import { redisClient } from 'config/redis';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import router from './routers/index';
import noCache from './middlewares/noCache';
import rateLimit from './lib/rateLimit';
import { sanitizeRequest } from './middlewares/sanitizeRequest';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(noCache);
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
            frameAncestors: ["'none'"],
        }
    }),
    helmet.crossOriginEmbedderPolicy(),
    helmet.crossOriginOpenerPolicy(),
    helmet.crossOriginResourcePolicy(),
    helmet.dnsPrefetchControl(),
);
app.use(rateLimit);
app.use(sanitizeRequest);

app.use(router);

app.get('/', async (req: Request, res: Response) => {
    res.send('Trace Log API is running...');
});

export async function start() {
    await connectMongo();
    redisClient.set("online", "true");
}

export default app;
