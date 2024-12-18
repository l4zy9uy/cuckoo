module.exports = (app) => {
    const orderItems = require("../controllers/order_items.controller.js");
    const router = require("express").Router();

    // Create a new order item
    router.post("/", orderItems.create);

    // Get all order items
    router.get("/", orderItems.findAll);

    // Get one order item by id
    router.get("/:id", orderItems.findOne);

    // Update an order item
    router.put("/:id", orderItems.update);

    // Delete an order item
    router.delete("/:id", orderItems.delete);

    app.use("/api/order-items", router);
}; 