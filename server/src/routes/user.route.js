import express from 'express';
import { login, logout, profile } from '../controllers/user.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/login', login);
// authRouter.post('/signup', signup);
authRouter.get('/profile', protectRoute, profile);
authRouter.post('/logout', protectRoute, logout);

export default authRouter;