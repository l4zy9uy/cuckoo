const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Table = sequelize.define("Table", {
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
      type: Sequelize.ENUM("Available", "Occupied", "Reserved"),
      allowNull: false,
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
