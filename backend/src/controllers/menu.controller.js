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
        res.status(500).send({error: getErrorMessage(error)});
    }
};

// Retrieve all Menus
exports.findAll = async (req, res) => {
    try {
        const menus = await Menu.findAll();
        res.status(200).send(menus);
    } catch (error) {
        res.status(500).send({error: getErrorMessage(error)});
    }
};

// Retrieve a single Menu by ID
exports.findOne = async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.menu_id);
        if (menu) {
            res.status(200).send(menu);
        } else {
            res.status(404).send({message: "Menu item not found"});
        }
    } catch (error) {
        res.status(500).send({error: getErrorMessage(error)});
    }
};

// Update a Menu by ID
exports.update = async (req, res) => {
    const menu_id = parseInt(req.params.id, 10); // Convert ID to integer
    const updateData = { ...req.body }; // Copy update data
    delete updateData.id; // Exclude `id` from the update payload

    console.log("Request Body:", updateData);
    console.log("Request Params:", { menu_id });

    try {
        // Attempt to update the record
        const [updateMenuCount] = await Menu.update(updateData, {
            where: { menu_id },
        });

        // Check if the record was found and updated
        if (updateMenuCount === 0) {
            return res.status(404).send({ message: `Menu item with id=${menu_id} not found.` });
        }

        // Retrieve the updated record
        const updatedMenu = await Menu.findOne({ where: { menu_id } });
        return res.status(200).send(updatedMenu);
    } catch (error) {
        console.error("Error updating menu item:", error);

        // Return a detailed error response
        return res.status(500).send({
            message: "An error occurred while updating the menu item.",
            error: error.message || "Unknown error.",
        });
    }
};



// Delete a Menu by ID
exports.delete = async (req, res) => {
    const id = req.params.id;

    // Use Sequelize model to delete a record
    Menu.destroy({
        where: {menu_id: id}
    })
        .then(deletedCount => {
            if (deletedCount === 0) {
                // No rows were deleted, so the ID does not exist
                res.status(404).send({message: `Menu with id=${id} not found!`});
            } else {
                res.send({message: "Menu deleted successfully!"});
            }
        })
        .catch(err => {
            // Handle any errors
            console.error(`Error deleting Menu with id=${id}:`, err);
            res.status(500).send({message: `Error deleting Menu with id=${id}`});
        });
};
