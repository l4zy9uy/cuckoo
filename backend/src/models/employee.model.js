module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      employee_id: {
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
      position: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      id_card_number: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM("Nam", "Nữ", "Khác"),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(15),
        unique: true,
        allowNull: true,
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
      Employee.belongsTo(models.Branch, {
        foreignKey: "branch_id",
        onDelete: "CASCADE",
      });
    };
  
    return Employee;
  };
  