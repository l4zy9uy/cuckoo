// models/Table.ts
import { Model, DataTypes } from "sequelize";
import { sequelizeConnection as sequelize } from "../database/db";
import { Branch } from "./branch";

class Table extends Model {}

Table.init(
  {
    table_id: {
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
    table_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Available", "Occupied", "Reserved"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Table",
  }
);

Table.belongsTo(Branch, { foreignKey: "branch_id", onDelete: "CASCADE" });
Branch.hasMany(Table, { foreignKey: "branch_id" });

export { Table };