import { Router } from "express";
import {
  createMenu,
  deleteMenu,
  getMenuById,
  getMenus,
  updateMenu,
} from "../controllers/menu";

export const router = Router();

router.post("/create", createMenu);
router.get("/getAll", getMenus);
router.get("/get/:menu_id", getMenuById);
router.put("/update/:menu_id", updateMenu);
router.delete("/delete/:menu_id", deleteMenu);