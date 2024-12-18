const db = require("../models");
const OrderItem = db.OrderItem;

// Create a new order item
exports.create = async (req, res) => {
    try {
        const orderItem = await OrderItem.create({
            order_id: req.body.order_id,
            menu_id: req.body.menu_id,
            quantity: req.body.quantity,
            price: req.body.price
        });
        res.status(201).json(orderItem);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Có lỗi xảy ra khi tạo order item."
        });
    }
};

// Get all order items
exports.findAll = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll();
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Có lỗi xảy ra khi lấy danh sách order items."
        });
    }
};

// Get one order item by id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const orderItem = await OrderItem.findByPk(id);
        if (orderItem) {
            res.json(orderItem);
        } else {
            res.status(404).json({
                message: `Không tìm thấy order item với id=${id}.`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Có lỗi xảy ra khi tìm order item."
        });
    }
};

// Update an order item
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const num = await OrderItem.update(req.body, {
            where: { id: id }
        });
        if (num[0] === 1) {
            res.json({
                message: "Order item đã được cập nhật thành công."
            });
        } else {
            res.status(404).json({
                message: `Không thể cập nhật order item với id=${id}.`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Có lỗi xảy ra khi cập nhật order item."
        });
    }
};

// Delete an order item
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const num = await OrderItem.destroy({
            where: { id: id }
        });
        if (num === 1) {
            res.json({
                message: "Order item đã được xóa thành công!"
            });
        } else {
            res.status(404).json({
                message: `Không thể xóa order item với id=${id}.`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Có lỗi xảy ra khi xóa order item."
        });
    }
}; 