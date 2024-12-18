// models/Supplier.ts
import { Model, DataTypes } from 'sequelize';
import { sequelizeConnection as sequelize} from '../database/db';

class Supplier extends Model {}

Supplier.init({
    supplier_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    contact_person: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Supplier',
    timestamps: false,
});

export default Supplier;