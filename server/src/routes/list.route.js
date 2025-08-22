import express from 'express';
import { deleteDistribution, getDistributionById, getDistributions, uploadAndDistribute } from '../controllers/list.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.js';

const listRouter = express.Router();

listRouter.post('/upload',upload.single('cvsFile'),  protectRoute, uploadAndDistribute);
listRouter.get('/', protectRoute, getDistributions);
listRouter.get('/:id', protectRoute, getDistributionById);
listRouter.delete('/delete/:id', protectRoute, deleteDistribution);

export default listRouter;