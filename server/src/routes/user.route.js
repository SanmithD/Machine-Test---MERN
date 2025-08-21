import express from 'express';
import { login, profile, signup } from '../controllers/user.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);
authRouter.get('/profile', protectRoute, profile);

export default authRouter;