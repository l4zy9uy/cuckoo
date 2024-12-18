// controllers/tableController.ts
import { Request, Response } from "express";
import { Table } from "../models/table";

const getErrorMessage = (error: any): string => {
  return error.message || "An unexpected error occurred";
};

export const createTable = async (req: Request, res: Response) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getTables = async (req: Request, res: Response) => {
  try {
    const tables = await Table.findAll();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getTableById = async (req: Request, res: Response) => {
  try {
    const table = await Table.findByPk(req.params.table_id);
    if (table) {
      res.status(200).json(table);
    } else {
      res.status(404).json({ message: "Table not found" });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const updateTable = async (req: Request, res: Response) => {
  try {
    const { table_id } = req.params;
    const [updated] = await Table.update(req.body, { where: { table_id } });
    if (updated) {
      const updatedTable = await Table.findOne({ where: { table_id } });
      res.status(200).json(updatedTable);
    } else {
      res.status(404).json({ error: "Table not found" });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const deleteTable = async (req: Request, res: Response) => {
  try {
    const { table_id } = req.params;
    const deleted = await Table.destroy({ where: { table_id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Table not found" });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};