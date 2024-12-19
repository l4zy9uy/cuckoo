module.exports = (app) => {
    const orderItems = require("../controllers/order_items.controller.js");
    const router = require("express").Router();

    // Kiểm tra xem các hàm này có tồn tại trong controller không
    console.log("Available controller methods:", Object.keys(orderItems));

    // Create a new Order Item
    router.post("/", orderItems.create);

    // Retrieve all Order Items
    router.get("/", orderItems.findAll);

    // Retrieve a single Order Item with id
    router.get("/:id", orderItems.findOne);

    // Update an Order Item with id
    router.put("/:id", orderItems.update);

    // Delete an Order Item
    router.delete("/:id", orderItems.delete);

    app.use("/api/order-items", router);
};