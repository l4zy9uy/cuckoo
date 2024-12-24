const db = require("../models");
const Table = db.table;

// Utility function to handle error messages
const getErrorMessage = (error) => {
    return error.message || "An unexpected error occurred";
};

// Create and Save a new Table
exports.create = async (req, res) => {
    try {
        const table = await Table.create(req.body);
        res.status(201).send(table);
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Retrieve all Tables
exports.findAll = async (req, res) => {
    try {
        const tables = await Table.findAll();
        res.status(200).send(tables);
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Retrieve a single Table by ID
exports.findOne = async (req, res) => {
    try {
        const table = await Table.findByPk(req.params.id);
        if (table) {
            res.status(200).send(table);
        } else {
            res.status(404).send({ message: "Table not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Update a Table by ID
exports.update = async (req, res) => {
    try {
        const table_id = req.params.id;
        const [updated] = await Table.update(req.body, { where: { table_id } });
        if (updated) {
            const updatedTable = await Table.findOne({ where: { table_id } });
            res.status(200).send(updatedTable);
        } else {
            res.status(404).send({ message: "Table not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Delete a Table by ID
exports.delete = async (req, res) => {
    try {
        const table_id = parseInt(req.params.id, 10); // Convert ID to integer
        const deleted = await Table.destroy({ where: { table_id: table_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: "Table not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};
