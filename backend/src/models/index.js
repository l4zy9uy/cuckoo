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
db.branch = require("../models/branch.model.js")(sequelize, Sequelize); // Added Branch model
db.table = require("../models/table.model.js")(sequelize, Sequelize); // Added Table model
db.customer = require("../models/customer.model.js")(sequelize, Sequelize); // Added Customer model
db.employee = require("../models/employee.model.js")(sequelize, Sequelize); // Added Employee model

// Define relationships
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

// Define foreign key relationships for other models
db.branch.hasMany(db.table, {
    foreignKey: 'branch_id',
    onDelete: 'CASCADE'
});
db.table.belongsTo(db.branch, {
    foreignKey: 'branch_id'
});

db.branch.hasMany(db.customer, {
    foreignKey: 'branch_id',
    onDelete: 'SET NULL'
});
db.customer.belongsTo(db.branch, {
    foreignKey: 'branch_id'
});

db.branch.hasMany(db.employee, {
    foreignKey: 'branch_id',
    onDelete: 'CASCADE'
});
db.employee.belongsTo(db.branch, {
    foreignKey: 'branch_id'
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
