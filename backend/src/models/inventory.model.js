module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("inventory", {
        inventory_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        branch_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        supplier_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        item_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        quantity: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        unit: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        cost_price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        last_updated: {
            type: Sequelize.DATE,  // Use Sequelize.DATE instead of Sequelize.TIMESTAMP
            defaultValue: Sequelize.NOW
        }
    });

    return Inventory;
};
