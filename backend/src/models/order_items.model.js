module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("order_item", {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
    });

    OrderItem.associate = (models) => {
        // Associations
        OrderItem.belongsTo(models.Order, {
            foreignKey: "order_id",
            onDelete: "CASCADE",
        });
        OrderItem.belongsTo(models.Menu, {
            foreignKey: "menu_id",
            onDelete: "CASCADE",
        });
    };

    return OrderItem;
};
