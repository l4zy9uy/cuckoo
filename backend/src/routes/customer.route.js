module.exports = app => {
    const customer = require("../controllers/customer.controller.js");

    var router = require("express").Router();

    // Create a new Customer
    router.post("/", customer.create);

    // Retrieve all Customers
    router.get("/", customer.findAll);

    // Search Customers
    router.get("/search", customer.search); // New route for searching

    // Retrieve a single Customer by ID
    router.get("/:id", customer.findOne);

    // Update a Customer by ID
    router.put("/:id", customer.update);

    // Delete a Customer by ID
    router.delete("/:id", customer.delete);

    // Add the router to the app
    app.use('/api/customers', router);
};
