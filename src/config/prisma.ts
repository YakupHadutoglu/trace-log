import dotenv from "dotenv";
dotenv.config();

// import { PrismaClient } from "@generated/prisma/client";
import { PrismaClient } from "@generated/client";

export const prisma = new PrismaClient()

prisma.$connect()
    .then(() => console.log('Connected to Prisma and PostgreSQL'))
    .catch((error) => console.error('Failed to connect to Prisma', `error = ${error}`));



