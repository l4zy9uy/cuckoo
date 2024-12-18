const db = require("../models");
const Employee = db.employee;

// Utility function to handle error messages
const getErrorMessage = (error) => {
    return error.message || "An unexpected error occurred";
};

// Create and Save a new Employee
exports.create = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).send(employee);
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Retrieve all Employees
exports.findAll = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Retrieve a single Employee by ID
exports.findOne = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.employee_id);
        if (employee) {
            res.status(200).send(employee);
        } else {
            res.status(404).send({ message: "Employee not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Update an Employee by ID
exports.update = async (req, res) => {
    try {
        const { employee_id } = req.params;
        const [updated] = await Employee.update(req.body, {
            where: { employee_id },
        });
        if (updated) {
            const updatedEmployee = await Employee.findOne({ where: { employee_id } });
            res.status(200).send(updatedEmployee);
        } else {
            res.status(404).send({ message: "Employee not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Delete an Employee by ID
exports.delete = async (req, res) => {
    try {
        const { employee_id } = req.params;
        const deleted = await Employee.destroy({ where: { employee_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: "Employee not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};
