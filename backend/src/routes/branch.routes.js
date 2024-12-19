module.exports = app => {
    const branch = require("../controllers/branch.controller.js");

    const router = require("express").Router();

    // Create a new Branch
    router.post("/", branch.create);

    // Retrieve all Branches
    router.get("/", branch.findAll);

    // Retrieve a single Branch with id
    router.get("/:id", branch.findOne);

    // Update a Branch with id
    router.put("/:id", branch.update);

    // Delete a Branch with id
    router.delete("/:id", branch.delete);

    // Delete all Branches
    router.delete("/", branch.deleteAll);

    // Retrieve Branches by restaurant_id

    app.use('/api/branch', router);
};
