module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .addColumn("hops", "betaLow", {
        allowNull: true,
        type: Sequelize.FLOAT,
      })
      .then(() =>
        queryInterface.addColumn("hops", "betaHigh", {
          allowNull: true,
          type: Sequelize.FLOAT,
        })
      ),

  down: (queryInterface) =>
    queryInterface
      .removeColumn("hops", "betaLow")
      .then(() => queryInterface.removeColumn("hops", "betaHigh")),
};
