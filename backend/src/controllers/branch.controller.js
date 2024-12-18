const db = require("../models");
const Branch = db.branch;

// Create and Save a new Branch
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Branch name cannot be empty!"
        });
        return;
    }

    // Create a Branch
    const branch = {
        restaurant_id: req.body.restaurant_id || null,
        name: req.body.name,
        address: req.body.address || null,
        phone: req.body.phone || null,
        opening_hours: req.body.opening_hours || null,
    };

    // Save Branch in the database
    Branch.create(branch)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Branch."
            });
        });
};

// Retrieve all Branches from the database
exports.findAll = (req, res) => {
    Branch.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving branches."
            });
        });
};

// Find a single Branch by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Branch.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Branch with id=${id} not found!`
                });
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Branch with id=" + id
            });
        });
};

// Update a Branch by id
exports.update = (req, res) => {
    const id = req.params.id;

    Branch.update(req.body, {
        where: { branch_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Branch was updated successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Branch with id=${id}. Maybe the Branch was not found or the request body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Branch with id=" + id
            });
        });
};

// Delete a Branch by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Branch.destroy({
        where: { branch_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Branch was deleted successfully!"
                });
            } else {
                res.status(400).send({
                    message: `Cannot delete Branch with id=${id}. Maybe the Branch was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Branch with id=" + id
            });
        });
};

// Delete all Branches from the database
exports.deleteAll = (req, res) => {
    Branch.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.status(200).send({
                message: `${nums} Branches were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all branches."
            });
        });
};

// Find all Branches by restaurant_id
exports.findAllByRestaurant = (req, res) => {
    const restaurant_id = req.params.restaurant_id;

    Branch.findAll({
        where: {
            restaurant_id: restaurant_id
        }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving branches."
            });
        });
};
