// models/Branch.ts
import { Model, DataTypes } from 'sequelize';
import { sequelizeConnection as sequelize } from '../database/db';

class Branch extends Model {}

Branch.init({
    branch_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    opening_hours: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Branch',
});

export default Branch;