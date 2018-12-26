module.exports = {
  up: queryInterface => queryInterface.removeColumn('hops', 'flavorProfile'),

  down: (queryInterface, Sequelize) => queryInterface.addColumn('hops', 'flavorProfile', {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  }),
};
