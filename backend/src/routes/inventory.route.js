module.exports = app => {
    const inventory = require("../controllers/inventory.controller.js");

    var router = require("express").Router();

    // Create a new Inventory
    router.post("/", inventory.create);

    // Retrieve all Inventories
    router.get("/", inventory.findAll);

    // Retrieve a single Inventory by ID
    router.get("/:inventory_id", inventory.findOne);

    // Update an Inventory by ID
    router.put("/:inventory_id", inventory.update);

    // Delete an Inventory by ID
    router.delete("/:inventory_id", inventory.delete);

    // Add the router to the app
    app.use('/api/inventories', router);
};
