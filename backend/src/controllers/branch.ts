// controllers/branchController.ts
import { Request, Response } from "express";
import { Branch } from "../models/branch";

const getErrorMessage = (error: any): string => {
  return error.message || "An unexpected error occurred";
};

export const createBranch = async (req: Request, res: Response) => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getBranches = async (req: Request, res: Response) => {
  try {
    const branches = await Branch.findAll();
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getBranchById = async (req: Request, res: Response) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (branch) {
      res.status(200).json(branch);
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching branch", error });
  }
};

export const updateBranch = async (req: Request, res: Response) => {
  try {
    const { branch_id } = req.params;
    const [updated] = await Branch.update(req.body, { where: { branch_id } });
    if (updated) {
      const updatedBranch = await Branch.findOne({ where: { branch_id } });
      res.status(200).json(updatedBranch);
    } else {
      res.status(404).json({ error: "Branch not found" });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const { branch_id } = req.params;
    const deleted = await Branch.destroy({ where: { branch_id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Branch not found" });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};