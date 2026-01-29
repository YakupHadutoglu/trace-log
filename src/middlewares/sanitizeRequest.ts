import { Request, Response, NextFunction } from 'express';
import { sanitizeInput } from '../lib/sanitizeInput';

/**
 * Sanitizes a string or object recursively
 */

export const sanitizeObject = (object: any): any => {
    if (typeof object === 'string') {
        return sanitizeInput(object);
    } else if (object && typeof object === 'object') {
        const sanitized: any = Array.isArray(object) ? [] : {};
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                if (key === 'password' || key === 'confirmPassword') {
                    sanitized[key] = object[key]; // Do not sanitize passwords
                } else {
                    sanitized[key] = sanitizeObject(object[key]);
                }
            }
        }
        return sanitized;
    }
    return object;
};

export const sanitizeRequest = (req: Request, res: Response, next: NextFunction) => {
    if (req.body) req.body = sanitizeObject(req.body); //! body safe

    if (req.query) {
        for (const key in req.query) {
            if (Object.prototype.hasOwnProperty.call(req.query, key)) {
                req.query[key] = sanitizeObject(req.query[key]); //! mutate
            }
        }
    }

    if (req.params) {
        for (const key in req.params) {
            if (Object.prototype.hasOwnProperty.call(req.params, key)) {
                req.params[key] = sanitizeObject(req.params[key]); //! mutate
            }
        }
    }

    next();
};
