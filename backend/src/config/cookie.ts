import strict from 'assert/strict';
import env from './env';

export const COOKIE_OPTIONS = {
    httpOnly: true, 
    sameSite: 'strict' as const,
    maxAge: 7 * 24 * 3600 * 1000
}
