const db = require("../models");
const OrderItem = db.OrderItem;
const Order = db.Order;
const Menu = db.Menu;

exports.create = async (req, res) => {
    try {
        // Validate request
        if (!req.body.order_id || !req.body.menu_id || !req.body.quantity) {
            return res.status(400).send({
                message: "Order ID, Menu ID and Quantity are required!"
            });
        }

        // Kiểm tra menu có tồn tại không
        const menu = await Menu.findByPk(req.body.menu_id);
        if (!menu) {
            return res.status(404).send({
                message: "Menu item not found!"
            });
        }

        // Create order item
        const orderItem = {
            order_id: req.body.order_id,
            menu_id: req.body.menu_id,
            quantity: req.body.quantity,
            price: menu.sale_price
        };

        const data = await OrderItem.create(orderItem);

        // Tính tổng tiền của order
        const orderItems = await OrderItem.findAll({
            where: { order_id: req.body.order_id }
        });

        const total = orderItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        // Cập nhật tổng tiền trong order
        await Order.update(
            { total_amount: total },
            { where: { id: req.body.order_id } }
        );

        res.status(201).send({
            orderItem: data,
            orderTotal: total
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order Item."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const condition = {};
        
        if (req.query.orderId) {
            condition.order_id = req.query.orderId;
        }

        const data = await OrderItem.findAll({
            where: condition,
            include: [{
                model: Menu,
                attributes: ['name', 'description', 'sale_price']
            }]
        });
        
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving order items."
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await OrderItem.findByPk(id, {
            include: [{
                model: Menu,
                attributes: ['name', 'description', 'sale_price']
            }]
        });
        
        if (!data) {
            return res.status(404).send({
                message: `Order Item with id=${id} not found!`
            });
        }
        
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Order Item with id=" + id
        });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const [num] = await OrderItem.update(req.body, {
            where: { id: id }
        });

        if (num === 1) {
            // Nếu cập nhật thành công, tính lại tổng tiền
            const orderItem = await OrderItem.findByPk(id);
            const orderItems = await OrderItem.findAll({
                where: { order_id: orderItem.order_id }
            });

            const total = orderItems.reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0);

            await Order.update(
                { total_amount: total },
                { where: { id: orderItem.order_id } }
            );

            res.send({
                message: "Order Item was updated successfully.",
                orderTotal: total
            });
        } else {
            res.status(404).send({
                message: `Cannot update Order Item with id=${id}. Maybe Order Item was not found!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error updating Order Item with id=" + id
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Lấy order_id trước khi xóa
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) {
            return res.status(404).send({
                message: `Order Item with id=${id} not found!`
            });
        }
        
        const orderId = orderItem.order_id;
        
        // Xóa order item
        await orderItem.destroy();
        
        // Tính lại tổng tiền
        const remainingItems = await OrderItem.findAll({
            where: { order_id: orderId }
        });

        const total = remainingItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        // Cập nhật tổng tiền trong order
        await Order.update(
            { total_amount: total },
            { where: { id: orderId } }
        );

        res.send({
            message: "Order Item was deleted successfully!",
            orderTotal: total
        });
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Order Item with id=" + id
        });
    }
}; 
module.exports = {
    create: exports.create,
    findAll: exports.findAll,
    findOne: exports.findOne,
    update: exports.update,
    delete: exports.delete
};
