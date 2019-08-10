module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn("yeast", "minTemp", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn("yeast", "maxTemp", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn("yeast", "minAttenuation", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn("yeast", "maxAttenuation", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn("yeast", "flocculation", {
        type: Sequelize.ENUM("LOW", "MEDIUM", "HIGH"),
        allowNull: false,
        defaultValue: "MEDIUM",
      }),
    ]),
  down: (queryInterface) =>
    Promise.all([
      queryInterface.removeColumn("yeast", "minTemp"),
      queryInterface.removeColumn("yeast", "maxTemp"),
      queryInterface.removeColumn("yeast", "minAttenuation"),
      queryInterface.removeColumn("yeast", "maxAttenuation"),
      queryInterface.removeColumn("yeast", "flocculation"),
    ]),
};
