module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      table_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      amount_paid: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      change_amount: {
        type: Sequelize.VIRTUAL,
        get() {
          return this.amount_paid - this.total_amount;
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["Pending", "Completed", "Cancelled"]],
        },
      },
    });
  
    // Define associations
    Order.associate = (models) => {
      Order.belongsTo(models.Branch, {
        foreignKey: "branch_id",
        onDelete: "SET NULL",
      });
      Order.belongsTo(models.Table, {
        foreignKey: "table_id",
        onDelete: "SET NULL",
      });
      Order.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        onDelete: "SET NULL",
      });
      Order.belongsTo(models.Employee, {
        foreignKey: "employee_id",
        onDelete: "SET NULL",
      });
    };
  
    return Order;
  };
  