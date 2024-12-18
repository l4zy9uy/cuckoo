// models/Branch.ts
import { Model, DataTypes } from "sequelize";
import { sequelizeConnection as sequelize } from "../database/db";

class Branch extends Model {}

Branch.init(
  {
      branch_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      restaurant_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      name: {
          type: DataTypes.STRING(100),
          allowNull: false,
      },
      address: {
          type: DataTypes.STRING(255),
          allowNull: true,
      },
      phone: {
          type: DataTypes.STRING(15),
          allowNull: true,
      },
      opening_hours: {
          type: DataTypes.STRING(100),
          allowNull: true,
      },
  },
  {
    sequelize,
    modelName: "Branch",
  }
);

export { Branch };