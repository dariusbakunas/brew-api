module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'users',
    'activationToken',
    {
      type: Sequelize.STRING,
      allowNull: true,
    },
  ),

  down: queryInterface => queryInterface.removeColumn('users', 'activationToken'),
};
