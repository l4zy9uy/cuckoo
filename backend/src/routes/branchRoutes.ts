// routes/branchRoutes.ts
import { Router } from 'express';
import { createBranch, getBranches, getBranchById, updateBranch, deleteBranch } from '../controllers/branchController';

const router = Router();

router.post('/branches', createBranch);
router.get('/branches', getBranches);
router.get('/branches/:id', getBranchById);
router.put('/branches/:branch_id', updateBranch);
router.delete('/branches/:branch_id', deleteBranch);

export default router;