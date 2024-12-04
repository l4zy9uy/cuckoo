module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define("menu", {
      name: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
      },
      item_group: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      availability: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      image: {
        type: Sequelize.STRING, // Adjust type if you need to store actual image data or URL
      },
    });
  
    Menu.associate = (models) => {
      // Associations
      Menu.belongsTo(models.Branch, {
        foreignKey: "branch_id",
        onDelete: "CASCADE",
      });
    };
  
    return Menu;
  };
  