module.exports = app => {
    const table = require("../controllers/table.controller.js");

    var router = require("express").Router();

    // Create a new Table
    router.post("/", table.create);

    // Retrieve all Tables
    router.get("/", table.findAll);

    // Retrieve a single Table by ID
    router.get("/:id", table.findOne);

    // Update a Table by ID
    router.put("/:id", table.update);

    // Delete a Table by ID
    router.delete("/:id", table.delete);

    // Add router to the app
    app.use('/api/tables', router);
};
