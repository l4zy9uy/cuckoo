// routes/toolRoutes.ts
import { Router } from 'express';
import { createTool, getTools, updateTool, deleteTool } from '../controllers/toolController';

const router = Router();

router.post('/tools', createTool);
router.get('/tools', getTools);
router.put('/tools/:id', updateTool);
router.delete('/tools/:id', deleteTool);

export default router;