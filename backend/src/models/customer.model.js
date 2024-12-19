module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        customer_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING(15),
            allowNull: true,
        },
        branch_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        gender: {
            type: Sequelize.ENUM("Nam", "Nữ", "Khác"),
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: true,
            unique: true,
        },
        note: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });

    Customer.associate = (models) => {
        Customer.belongsTo(models.Branch, {
            foreignKey: "branch_id",
            onDelete: "SET NULL",
        });
    };

    return Customer;
};
