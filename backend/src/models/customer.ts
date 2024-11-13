// models/Customer.ts
import { Model, DataTypes } from 'sequelize';
import {sequelizeConnection as sequelize} from '../database/db';
import Branch from './branch';

class Customer extends Model {}

Customer.init({
    customer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
    },
    branch_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Branch',
            key: 'branch_id',
        },
        onDelete: 'SET NULL',
    },
    gender: {
        type: DataTypes.ENUM('Nam', 'Nữ', 'Khác'),
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    note: {
        type: DataTypes.TEXT,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Customer',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Branch.hasMany(Customer, { foreignKey: 'branch_id' });
Customer.belongsTo(Branch, { foreignKey: 'branch_id' });

export default Customer;