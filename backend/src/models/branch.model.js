module.exports = (sequelize, Sequelize) => {
    const Branch = sequelize.define("branch", {
        branch_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        restaurant_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        phone: {
            type: Sequelize.STRING(15),
            allowNull: true,
        },
        opening_hours: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
    });

    return Branch;
};
