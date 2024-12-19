const Supplier = require("../models/supplier.model");

// Utility function for error handling
const getErrorMessage = (error) => {
    return error.message || "An unexpected error occurred";
};

// Create a new Supplier
exports.create = async (req, res) => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(201).send(supplier);
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Retrieve all Suppliers
exports.findAll = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.status(200).send(suppliers);
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Retrieve a single Supplier by ID
exports.findOne = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.supplier_id);
        if (supplier) {
            res.status(200).send(supplier);
        } else {
            res.status(404).send({ message: "Supplier not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Update a Supplier by ID
exports.update = async (req, res) => {
    try {
        const { supplier_id } = req.params;
        const [updated] = await Supplier.update(req.body, { where: { id: supplier_id } });
        if (updated) {
            const updatedSupplier = await Supplier.findOne({ where: { id: supplier_id } });
            res.status(200).send(updatedSupplier);
        } else {
            res.status(404).send({ message: "Supplier not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Delete a Supplier by ID
exports.delete = async (req, res) => {
    try {
        const { supplier_id } = req.params;
        const deleted = await Supplier.destroy({ where: { id: supplier_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: "Supplier not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};
