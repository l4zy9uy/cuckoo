module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("order_items", {
        order_item_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        menu_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'order_items'
    });

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order, {
            foreignKey: 'order_id',
            targetKey: 'order_id',
            onDelete: 'CASCADE'
        });
        OrderItem.belongsTo(models.Menu, {
            foreignKey: 'menu_id',
            targetKey: 'id',
            onDelete: 'CASCADE'
        });
    };

    return OrderItem;
};
