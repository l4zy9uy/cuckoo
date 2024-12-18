// routes/branchRoutes.ts
import { Router } from "express";
import {
  createBranch,
  deleteBranch,
  getBranchById,
  getBranches,
  updateBranch,
} from "../controllers/branch";

export const router = Router();

router.post("/create", createBranch);
router.get("/getAll", getBranches);
router.get("/get/:id", getBranchById);
router.put("/update/:branch_id", updateBranch);
router.delete("/delete/:branch_id", deleteBranch);