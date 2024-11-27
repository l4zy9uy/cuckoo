// models/Menu.ts
import { Model, DataTypes } from "sequelize";
import { sequelizeConnection as sequelize } from "../database/db";
import { Branch } from "./branch";

class Menu extends Model {}

Menu.init(
  {
    menu_id: {
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
    description: {
      type: DataTypes.TEXT,
    },
    sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cost_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    item_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    item_group: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    image: {
      type: DataTypes.STRING, // Assuming image is a URL or file path stored as a string
    },
  },
  {
    sequelize,
    modelName: "Menu",
  }
);

Menu.belongsTo(Branch, { foreignKey: "branch_id", onDelete: "CASCADE" });
Branch.hasMany(Menu, { foreignKey: "branch_id" });

export { Menu };