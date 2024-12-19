const Customer = require("../models/customer.model");
const { Op } = require("sequelize");

// Utility function for consistent error messages
const getErrorMessage = (error) => {
    return error.message || "An unexpected error occurred";
};

// Create a new Customer
exports.create = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).send(customer);
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Retrieve all Customers
exports.findAll = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Retrieve a single Customer by ID
exports.findOne = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (customer) {
            res.status(200).send(customer);
        } else {
            res.status(404).send({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Update a Customer by ID
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Customer.update(req.body, { where: { customer_id: id } });
        if (updated) {
            const updatedCustomer = await Customer.findOne({ where: { customer_id: id } });
            res.status(200).send(updatedCustomer);
        } else {
            res.status(404).send({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Delete a Customer by ID
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Customer.destroy({ where: { customer_id: id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Search Customers
exports.search = async (req, res) => {
    const { name, phone } = req.query;

    const searchConditions = {};
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
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send({ message: "Error searching customers", error });
    }
};
