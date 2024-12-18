// controllers/supplierController.ts
import { Request, Response } from 'express';
import Supplier from '../models/supplier';

const getErrorMessage = (error: any): string => {
    return error.message || 'An unexpected error occurred';
};

export const createSupplier = async (req: Request, res: Response) => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const getSuppliers = async (req: Request, res: Response) => {
    try {
        const suppliers = await Supplier.findAll();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const getSupplierById = async (req: Request, res: Response) => {
    try {
        const supplier = await Supplier.findByPk(req.params.supplier_id);
        if (supplier) {
            res.status(200).json(supplier);
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const updateSupplier = async (req: Request, res: Response) => {
    try {
        const { supplier_id } = req.params;
        const [updated] = await Supplier.update(req.body, { where: { supplier_id } });
        if (updated) {
            const updatedSupplier = await Supplier.findOne({ where: { supplier_id } });
            res.status(200).json(updatedSupplier);
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const deleteSupplier = async (req: Request, res: Response) => {
    try {
        const { supplier_id } = req.params;
        const deleted = await Supplier.destroy({ where: { supplier_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};