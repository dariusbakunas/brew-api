module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("quotes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      author: {
        type: Sequelize.STRING,
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable("quotes"),
};
