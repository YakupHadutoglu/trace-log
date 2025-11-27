import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from 'utils/token';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized! No token provided ' });

        const token = authHeader.split(' ')[1];
        
        const decoded = verifyAccessToken(token);

        if (!decoded) return res.status(401).json({ message: 'Unauthorized: on expired token.' });

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Authentication Error: ', error);
        return res.status(401).json({ message: 'Unauthorized: on expired token.' });
    }

}
