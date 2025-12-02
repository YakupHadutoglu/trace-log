import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { registerSchema } from '../schemas/register.schema';
import { loginSchema } from '../schemas/login.schema';

const router: Router = Router();

router.post('/register', validate(registerSchema) , AuthController.register);
router.post('/login', validate(loginSchema) , AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout' , AuthController.logout);

export default router;
