module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .removeColumn("hops", "usage")
      .then(() =>
        queryInterface.addColumn("hops", "bittering", {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        })
      )
      .then(() =>
        queryInterface.addColumn("hops", "aroma", {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        })
      ),
  down: (queryInterface, Sequelize) =>
    queryInterface
      .removeColumn("hops", "bittering")
      .then(() => queryInterface.removeColumn("hops", "aroma"))
      .then(() =>
        queryInterface.addColumn("hops", "usage", {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "",
        })
      ),
};
