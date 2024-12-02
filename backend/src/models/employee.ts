// models/Employee.ts
import { Model, DataTypes } from "sequelize";
import { sequelizeConnection as sequelize } from "../database/db";
import { Branch } from "./branch";

class Employee extends Model {}

Employee.init(
  {
    employee_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Branch,
        key: "branch_id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_card_number: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Nam", "Nữ", "Khác"),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      unique: true,
    },
    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Employee",
  }
);

Employee.belongsTo(Branch, { foreignKey: "branch_id", onDelete: "CASCADE" });
Branch.hasMany(Employee, { foreignKey: "branch_id" });

export { Employee };