import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "../controllers/employee";

export const router = Router();

router.post("/create", createEmployee);
router.get("/getAll", getEmployees);
router.get("/get/:employee_id", getEmployeeById);
router.put("/update/:employee_id", updateEmployee);
router.delete("/delete/:employee_id", deleteEmployee);