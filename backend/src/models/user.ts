import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../database/db";

class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        modelName: "User",
        tableName: "users",
    }
);

export default User;
