const db = require("../models");
const Menu = db.menu;

// Utility function to handle error messages
const getErrorMessage = (error) => {
    return error.message || "An unexpected error occurred";
};

// Create and Save a new Menu
exports.create = async (req, res) => {
    try {
        const menu = await Menu.create(req.body);
        res.status(201).send(menu);
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Retrieve all Menus
exports.findAll = async (req, res) => {
    try {
        const menus = await Menu.findAll();
        res.status(200).send(menus);
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Retrieve a single Menu by ID
exports.findOne = async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.menu_id);
        if (menu) {
            res.status(200).send(menu);
        } else {
            res.status(404).send({ message: "Menu item not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Update a Menu by ID
exports.update = async (req, res) => {
    try {
        const { menu_id } = req.params;
        const [updated] = await Menu.update(req.body, { where: { menu_id } });
        if (updated) {
            const updatedMenu = await Menu.findOne({ where: { menu_id } });
            res.status(200).send(updatedMenu);
        } else {
            res.status(404).send({ message: "Menu item not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};

// Delete a Menu by ID
exports.delete = async (req, res) => {
    try {
        const { menu_id } = req.params;
        const deleted = await Menu.destroy({ where: { menu_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: "Menu item not found" });
        }
    } catch (error) {
        res.status(500).send({ error: getErrorMessage(error) });
    }
};
