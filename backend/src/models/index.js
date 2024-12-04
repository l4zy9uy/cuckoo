const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define models
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);
db.branch = require("../models/branch.model.js")(sequelize, Sequelize);
db.table = require("../models/table.model.js")(sequelize, Sequelize);
db.customer = require("../models/customer.model.js")(sequelize, Sequelize);
db.employee = require("../models/employees.model.js")(sequelize, Sequelize);  // Updated path for Employee model
db.menu = require("../models/menus.model.js")(sequelize, Sequelize);  // Added Menu model
db.order = require("../models/order.model.js")(sequelize, Sequelize);  // Added Order model
db.orderItem = require("../models/order_items.model.js")(sequelize, Sequelize);  // Added OrderItem model
db.supplier = require("../models/suppliers.model.js")(sequelize, Sequelize);  // Added Supplier model
db.inventory = require("../models/inventory.model.js")(sequelize, Sequelize);  // Added Inventory model

// Define relationships

// User and Role relationships
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

// Branch and Table relationships
db.branch.hasMany(db.table, {
    foreignKey: 'branch_id',
    onDelete: 'CASCADE'
});
db.table.belongsTo(db.branch, {
    foreignKey: 'branch_id'
});

// Branch and Customer relationships
db.branch.hasMany(db.customer, {
    foreignKey: 'branch_id',
    onDelete: 'SET NULL'
});
db.customer.belongsTo(db.branch, {
    foreignKey: 'branch_id'
});

// Branch and Employee relationships
db.branch.hasMany(db.employee, {
    foreignKey: 'branch_id',
    onDelete: 'CASCADE'
});
db.employee.belongsTo(db.branch, {
    foreignKey: 'branch_id'
});

// Branch and Menu relationships
db.branch.hasMany(db.menu, {
    foreignKey: 'branch_id',
    onDelete: 'CASCADE'
});
db.menu.belongsTo(db.branch, {
    foreignKey: 'branch_id'
});

// Order and relationships
db.branch.hasMany(db.order, {
    foreignKey: 'branch_id',
    onDelete: 'SET NULL'
});
db.order.belongsTo(db.branch, {
    foreignKey: 'branch_id'
});

db.employee.hasMany(db.order, {
    foreignKey: 'employee_id',
    onDelete: 'CASCADE'
});
db.order.belongsTo(db.employee, {
    foreignKey: 'employee_id'
});

db.customer.hasMany(db.order, {
    foreignKey: 'customer_id',
    onDelete: 'SET NULL'
});
db.order.belongsTo(db.customer, {
    foreignKey: 'customer_id'
});

// Order and OrderItems relationships
db.order.hasMany(db.orderItem, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE'
});
db.orderItem.belongsTo(db.order, {
    foreignKey: 'order_id'
});

db.menu.hasMany(db.orderItem, {
    foreignKey: 'menu_id',
    onDelete: 'CASCADE'
});
db.orderItem.belongsTo(db.menu, {
    foreignKey: 'menu_id'
});

// Supplier and Inventory relationships
db.supplier.hasMany(db.inventory, {
    foreignKey: 'supplier_id',
    onDelete: 'CASCADE'
});
db.inventory.belongsTo(db.supplier, {
    foreignKey: 'supplier_id'
});

module.exports = db;
