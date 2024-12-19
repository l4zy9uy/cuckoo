module.exports = app => {
    const menu = require("../controllers/menu.controller.js");

    var router = require("express").Router();

    // Create a new Menu item
    router.post("/", menu.create);

    // Retrieve all Menu items
    router.get("/", menu.findAll);

    // Retrieve a single Menu item by ID
    router.get("/:id", menu.findOne);

    // Update a Menu item by ID
    router.put("/:id", menu.update);

    // Delete a Menu item by ID
    router.delete("/:id", menu.delete);

    // Add router to the app
    app.use('/api/menus', router);
};
