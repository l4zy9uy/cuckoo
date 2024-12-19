module.exports = app => {
    const order = require("../controllers/order.controller.js");

    var router = require("express").Router();

    // Create a new Order
    router.post("/", order.create);

    // Retrieve all Orders
    router.get("/", order.findAll);

    // Retrieve a single Order with id
    router.get("/:id", order.findOne);

    // Update an Order with id
    router.put("/:id", order.update);

    // Delete an Order with id
    router.delete("/:id", order.delete);

    // Delete all Orders
    router.delete("/", order.deleteAll);

    // Retrieve Orders by status
    router.get("/status/:status", order.findAllByStatus);

    app.use('/api/orders', router);
};
