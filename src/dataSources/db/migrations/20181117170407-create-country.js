module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("countries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING(2),
        unique: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(80),
      },
    }),
  down: (queryInterface) => queryInterface.dropTable("countries"),
};
