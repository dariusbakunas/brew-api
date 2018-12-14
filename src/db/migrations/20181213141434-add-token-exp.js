module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'users',
    'activationTokenExp',
    {
      type: Sequelize.DATE,
      allowNull: true,
    },
  ),

  down: queryInterface => queryInterface.removeColumn('users', 'activationTokenExp'),
};
