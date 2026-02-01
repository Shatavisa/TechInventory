
import { Router } from 'express';
import { signup, signIn } from '../controller/auth.controller.js';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signIn)

export default authRouter;
