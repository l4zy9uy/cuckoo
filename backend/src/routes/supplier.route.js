module.exports = app => {
    const supplier = require("../controllers/supplier.controller.js");

    var router = require("express").Router();

    // Create a new Supplier
    router.post("/", supplier.create);

    // Retrieve all Suppliers
    router.get("/", supplier.findAll);

    // Retrieve a single Supplier by ID
    router.get("/:supplier_id", supplier.findOne);

    // Update a Supplier by ID
    router.put("/:supplier_id", supplier.update);

    // Delete a Supplier by ID
    router.delete("/:supplier_id", supplier.delete);

    // Add the router to the app
    app.use('/api/suppliers', router);
};
