// models/Tool.ts
import { Model, DataTypes } from 'sequelize';
import { sequelizeConnection as sequelize} from '../database/db';

class Tool extends Model {}

Tool.init({
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Tool',
});

export default Tool;