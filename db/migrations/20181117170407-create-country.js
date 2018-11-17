module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Countries', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    iso: {
      allowNull: false,
      type: Sequelize.STRING(2),
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING(80),
    },
    niceName: {
      allowNull: false,
      type: Sequelize.STRING(80),
    },
    iso3: {
      default: Sequelize.NULL,
      type: Sequelize.STRING(3),
    },
    numCode: {
      default: Sequelize.NULL,
      type: Sequelize.INTEGER.UNSIGNED,
    },
    phoneCode: {
      allowNull: false,
      type: Sequelize.INTEGER.UNSIGNED,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Countries'),
};
