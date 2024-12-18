// controllers/toolController.ts
import { Request, Response } from 'express';
import Tool from '../models/tool';

export const createTool = async (req: Request, res: Response) => {
    try {
        const tool = await Tool.create(req.body);
        res.status(201).json(tool);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getTools = async (req: Request, res: Response) => {
    try {
        const tools = await Tool.findAll();
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateTool = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Tool.update(req.body, { where: { id } });
        if (updated) {
            const updatedTool = await Tool.findOne({ where: { id } });
            res.status(200).json(updatedTool);
        } else {
            res.status(404).json({ error: 'Tool not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteTool = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Tool.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Tool not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};