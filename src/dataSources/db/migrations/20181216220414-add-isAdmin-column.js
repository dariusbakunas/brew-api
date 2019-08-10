module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn("users", "isAdmin", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }),

  down: (queryInterface) => queryInterface.removeColumn("users", "isAdmin"),
};
