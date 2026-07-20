import z from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2).max(30),
    surname: z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(30),
});
