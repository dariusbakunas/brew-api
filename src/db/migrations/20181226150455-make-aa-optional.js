module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('hops', 'aaLow', {
    type: Sequelize.FLOAT,
    allowNull: true,
  }).then(() => queryInterface.changeColumn('hops', 'aaHigh', {
    type: Sequelize.FLOAT,
    allowNull: true,
  })),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn('hops', 'aaLow', {
    type: Sequelize.FLOAT,
    allowNull: false,
  }).then(() => queryInterface.changeColumn('hops', 'aaHigh', {
    type: Sequelize.FLOAT,
    allowNull: false,
  })),
};
