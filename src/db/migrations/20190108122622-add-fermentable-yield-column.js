module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'fermentables',
    'yield',
    {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  ),

  down: queryInterface => queryInterface.removeColumn(
    'fermentables',
    'yield',
  ),
};
