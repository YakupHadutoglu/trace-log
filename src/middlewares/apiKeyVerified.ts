import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            project: {
                id: string,
                name: string,
                platform: string,
                useCase: string,
                createdAt: string,
                apiKey: string,
                verificationKeyStatus: boolean
            }
        }
    }
}

export const apiKeyVerifiedMd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.project) {
            // Eğer buraya proje olmadan geldiyse, önceki middleware işini yapamamış demektir.
            return res.status(500).json({ message: 'Server Error: Project context missing.' });
        }
        if (req.project.verificationKeyStatus === false) return res.status(401).json({ message: 'apiKey in not verified , api key verifided necessary' });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal error server!' });
    }
}
