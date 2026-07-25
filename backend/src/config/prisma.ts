import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from '../generated/client';


export const prisma = new PrismaClient()

prisma.$connect()
    .then(() => console.log('Connected to Prisma and PostgreSQL'))
    .catch((error: Error) => console.error('Failed to connect to Prisma', `error = ${error}`));



