import { Request, Response, NextFunction } from 'express';
import { sanitizeInput } from '../lib/sanitizeInput';

/**
 *A given object sanitizes values in the array or string as self -authentic.
 *Change the object or array on-site.
 *@Param obj to be sanitized objects, sequences or string.
 *@returns sanitized object.
 */

export const santitizeObject = (object: any): any =>  {
    if (typeof object === 'string') {
        return sanitizeInput(object);
    } else {
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object , key)) {
                object[key] = sanitizeInput(object[key]);
            }
        }
        return object;
    }
}

export const sanitizeRequest = (req: Request, res: Response, next: NextFunction) => {
    req.body = santitizeObject(req.body);
    req.params = santitizeObject(req.params);
    req.query = santitizeObject(req.query);
    next();
}
