import { Request } from "express";

export interface TokenPayload {
    sub: string;
    name: string;
    surname: string;
    email: string;
    approvedStatus: boolean;
    [key: string]: any;
}

export type payload = {
    sub?: string,
    userId?: string;
    name?: string;
    surname?: string;
    email?: string;
    [key: string]: any;
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}
