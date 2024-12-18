const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Menu = sequelize.define("Menu", {
        menu_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        branch_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
        },
        sale_price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        cost_price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        item_type: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        item_group: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        availability: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        image: {
            type: Sequelize.STRING, // Assuming image is a URL or file path stored as a string
        },
    });

    Menu.associate = (models) => {
        Menu.belongsTo(models.Branch, {
            foreignKey: "branch_id",
            onDelete: "CASCADE",
        });
    };

    return Menu;
};
