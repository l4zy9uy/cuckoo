module.exports = (sequelize, Sequelize) => {
    const Table = sequelize.define("table", {
      table_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      table_number: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          isIn: [["Available", "Occupied", "Reserved"]],
        },
      },
    });
  
    Table.associate = (models) => {
      Table.belongsTo(models.Branch, {
        foreignKey: "branch_id",
        onDelete: "CASCADE",
      });
    };
  
    return Table;
  };
  