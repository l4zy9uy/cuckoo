import express, { Router } from "express";
import { router as employeeRoute } from "./employee";
import { router as menuRoute } from "./menu";
import { router as branchRoute } from "./branch";

export const router = Router();

router.use("/employee", employeeRoute);
router.use("/menu", menuRoute);
router.use("/branch", branchRoute);