// controllers/inventoryController.ts
import { Request, Response } from 'express';
import Inventory from '../models/inventory';

const getErrorMessage = (error: any): string => {
    return error.message || 'An unexpected error occurred';
};

export const createInventory = async (req: Request, res: Response) => {
    try {
        const inventory = await Inventory.create(req.body);
        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const getInventories = async (req: Request, res: Response) => {
    try {
        const inventories = await Inventory.findAll();
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const getInventoryById = async (req: Request, res: Response) => {
    try {
        const inventory = await Inventory.findByPk(req.params.inventory_id);
        if (inventory) {
            res.status(200).json(inventory);
        } else {
            res.status(404).json({ message: 'Inventory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const updateInventory = async (req: Request, res: Response) => {
    try {
        const { inventory_id } = req.params;
        const [updated] = await Inventory.update(req.body, { where: { inventory_id } });
        if (updated) {
            const updatedInventory = await Inventory.findOne({ where: { inventory_id } });
            res.status(200).json(updatedInventory);
        } else {
            res.status(404).json({ message: 'Inventory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const deleteInventory = async (req: Request, res: Response) => {
    try {
        const { inventory_id } = req.params;
        const deleted = await Inventory.destroy({ where: { inventory_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Inventory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};