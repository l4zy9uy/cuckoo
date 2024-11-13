// models/Inventory.ts
import { Model, DataTypes } from 'sequelize';
import { sequelizeConnection as sequelize} from '../database/db';
import Branch from './branch';
import Supplier from './supplier';

class Inventory extends Model {}

Inventory.init({
    inventory_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Branch',
            key: 'branch_id',
        },
        onDelete: 'CASCADE',
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Supplier',
            key: 'supplier_id',
        },
        onDelete: 'SET NULL',
    },
    item_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    last_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Inventory',
    timestamps: false,
});

Branch.hasMany(Inventory, { foreignKey: 'branch_id' });
Supplier.hasMany(Inventory, { foreignKey: 'supplier_id' });
Inventory.belongsTo(Branch, { foreignKey: 'branch_id' });
Inventory.belongsTo(Supplier, { foreignKey: 'supplier_id' });

export default Inventory;