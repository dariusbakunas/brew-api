module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn("recipes", "boilTime", {
        allowNull: false,
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn("recipes", "source", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("recipes", "description", {
        type: Sequelize.TEXT,
      }),
      queryInterface.addColumn("recipes", "createdBy", {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      }),
    ]),
  down: (queryInterface) =>
    Promise.all([
      queryInterface.removeColumn("recipes", "boilTime"),
      queryInterface.removeColumn("recipes", "source"),
      queryInterface.removeColumn("recipes", "description"),
      queryInterface.removeColumn("recipes", "createdBy"),
    ]),
};
