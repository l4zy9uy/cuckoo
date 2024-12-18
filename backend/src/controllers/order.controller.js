const db = require("../models");
const Order = db.order;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if (!req.body.branch_id || !req.body.employee_id || !req.body.total_amount || !req.body.amount_paid || !req.body.status) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create an Order
    const order = {
        branch_id: req.body.branch_id,
        table_id: req.body.table_id || null, // Optional table_id
        customer_id: req.body.customer_id || null, // Optional customer_id
        employee_id: req.body.employee_id,
        order_date: req.body.order_date || new Date(),
        total_amount: req.body.total_amount,
        amount_paid: req.body.amount_paid,
        change_amount: req.body.amount_paid - req.body.total_amount, // Calculate change
        status: req.body.status
    };

    // Save Order in the database
    Order.create(order)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order."
            });
        });
};

// Retrieve all Orders from the database
exports.findAll = (req, res) => {
    Order.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};

// Find a single Order by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Order with id=${id} not found!`
                });
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Order with id=" + id
            });
        });
};

// Update an Order by id
exports.update = (req, res) => {
    const id = req.params.id;

    Order.update(req.body, {
        where: { order_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Order was updated successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Order with id=${id}. Maybe the Order was not found or the request body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id=" + id
            });
        });
};

// Delete an Order by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Order.destroy({
        where: { order_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Order was deleted successfully!"
                });
            } else {
                res.status(400).send({
                    message: `Cannot delete Order with id=${id}. Maybe the Order was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order with id=" + id
            });
        });
};

// Delete all Orders from the database
exports.deleteAll = (req, res) => {
    Order.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.status(200).send({
                message: `${nums} Orders were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all orders."
            });
        });
};

// Find all Orders by status
exports.findAllByStatus = (req, res) => {
    const status = req.params.status;

    Order.findAll({
        where: {
            status: status
        }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};
