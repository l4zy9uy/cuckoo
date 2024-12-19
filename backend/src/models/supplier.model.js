const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Supplier = sequelize.define(
        "Supplier",
        {
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
        },
        {
            sequelize,
            modelName: "Supplier",
            timestamps: false, // Disables automatic `createdAt` and `updatedAt`
        }
    );

    return Supplier;
};
