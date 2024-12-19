const Inventory = require("../models/inventory.model");

// Utility function for error handling
const getErrorMessage = (error) => {
    return error.message || "An unexpected error occurred";
};

// Create a new Inventory
exports.create = async (req, res) => {
    try {
        const inventory = await Inventory.create(req.body);
        res.status(201).send(inventory);
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Retrieve all Inventories
exports.findAll = async (req, res) => {
    try {
        const inventories = await Inventory.findAll();
        res.status(200).send(inventories);
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Retrieve a single Inventory by ID
exports.findOne = async (req, res) => {
    try {
        const inventory = await Inventory.findByPk(req.params.inventory_id);
        if (inventory) {
            res.status(200).send(inventory);
        } else {
            res.status(404).send({ message: "Inventory not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Update an Inventory by ID
exports.update = async (req, res) => {
    try {
        const { inventory_id } = req.params;
        const [updated] = await Inventory.update(req.body, { where: { inventory_id } });
        if (updated) {
            const updatedInventory = await Inventory.findOne({ where: { inventory_id } });
            res.status(200).send(updatedInventory);
        } else {
            res.status(404).send({ message: "Inventory not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Delete an Inventory by ID
exports.delete = async (req, res) => {
    try {
        const { inventory_id } = req.params;
        const deleted = await Inventory.destroy({ where: { inventory_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: "Inventory not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};
