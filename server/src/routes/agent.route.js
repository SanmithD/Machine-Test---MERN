import express from 'express';
import { createAgent, deleteAgent, getAgentById, getAgents, updateAgent } from '../controllers/agent.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const agentRouter = express.Router();

agentRouter.post('/create',protectRoute, createAgent);
agentRouter.get('/get', protectRoute, getAgents);
agentRouter.get('/get/:id', protectRoute, getAgentById);
agentRouter.put('/update/:id', protectRoute, updateAgent);
agentRouter.delete('/delete/:id', protectRoute, deleteAgent);

export default agentRouter;