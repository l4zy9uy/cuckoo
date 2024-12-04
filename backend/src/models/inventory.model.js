module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("inventory", {
      item_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cost_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      last_updated: {
        type: Sequelize.TIMESTAMP,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  
    Inventory.associate = (models) => {
      // Associations
      Inventory.belongsTo(models.Branch, {
        foreignKey: "branch_id",
        onDelete: "CASCADE",
      });
      Inventory.belongsTo(models.Supplier, {
        foreignKey: "supplier_id",
        onDelete: "SET NULL",
      });
    };
  
    return Inventory;
  };
  