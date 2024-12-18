// controllers/menuController.ts
import { Request, Response } from "express";
import { Menu } from "../models/menu";

const getErrorMessage = (error: any): string => {
  return error.message || "An unexpected error occurred";
};

export const createMenu = async (req: Request, res: Response) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getMenus = async (req: Request, res: Response) => {
  try {
    const menus = await Menu.findAll();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getMenuById = async (req: Request, res: Response) => {
  try {
    const menu = await Menu.findByPk(req.params.menu_id);
    console.log(req.params.menu_id);
    if (menu) {
      res.status(200).json(menu);
    } else {
      res.status(404).json({ message: "Menu item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { menu_id } = req.params;
    const [updated] = await Menu.update(req.body, { where: { menu_id } });
    if (updated) {
      const updatedMenu = await Menu.findOne({ where: { menu_id } });
      res.status(200).json(updatedMenu);
    } else {
      res.status(404).json({ error: "Menu item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { menu_id } = req.params;
    const deleted = await Menu.destroy({ where: { menu_id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Menu item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};