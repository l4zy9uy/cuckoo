module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_card_number: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    birth_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    gender: {
      type: Sequelize.ENUM('Nam', 'Nữ', 'Khác'),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      unique: true,
    },
    hire_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    salary: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  Employee.associate = (models) => {
    // Associations
    Employee.belongsTo(models.Branch, {
      foreignKey: "branch_id",
      onDelete: "CASCADE",
    });
  };

  return Employee;
};
