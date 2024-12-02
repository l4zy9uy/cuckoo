// controllers/employeeController.ts
import { Request, Response } from "express";
import { Employee } from "../models/employee";

const getErrorMessage = (error: any): string => {
  return error.message || "An unexpected error occurred";
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByPk(req.params.employee_id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { employee_id } = req.params;
    const [updated] = await Employee.update(req.body, {
      where: { employee_id },
    });
    if (updated) {
      const updatedEmployee = await Employee.findOne({
        where: { employee_id },
      });
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { employee_id } = req.params;
    const deleted = await Employee.destroy({ where: { employee_id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};