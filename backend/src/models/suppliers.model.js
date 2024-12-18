module.exports = (sequelize, Sequelize) => {
  return sequelize.define("supplier", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      contact_person: {
        type: Sequelize.STRING,
      },
    });
  };
  