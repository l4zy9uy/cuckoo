import { Router } from "express";
import {
  createTable,
  deleteTable,
  getTableById,
  getTables,
  updateTable,
} from "../controllers/table";

export const router = Router();

router.post("/create", createTable);
router.get("/getAll", getTables);
router.get("/get/:table_id", getTableById);
router.put("/update/:table_id", updateTable);
router.delete("/delete/:table_id", deleteTable);