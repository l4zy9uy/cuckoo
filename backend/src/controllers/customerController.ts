// controllers/customerController.ts
import { Request, Response } from 'express';
import Customer from '../models/customer';
import {Op} from 'sequelize';

const getErrorMessage = (error: any): string => {
    return error.message || 'An unexpected error occurred';
};

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const customer = await Customer.findByPk(req.params.customer_id);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const { customer_id } = req.params;
        const [updated] = await Customer.update(req.body, { where: { customer_id } });
        if (updated) {
            const updatedCustomer = await Customer.findOne({ where: { customer_id } });
            res.status(200).json(updatedCustomer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const { customer_id } = req.params;
        const deleted = await Customer.destroy({ where: { customer_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const searchCustomers = async (req: Request, res: Response) => {
    const { name, phone } = req.query;

    const searchConditions: any = {};
    if (name) {
        searchConditions.name = { [Op.like]: `%${name}%` };
    }
    if (phone) {
        searchConditions.phone = { [Op.like]: `%${phone}%` };
    }

    try {
        const customers = await Customer.findAll({
            where: searchConditions
        });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error searching customers', error });
    }
};