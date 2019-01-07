const updateQuery = 'UPDATE roles SET code = md5(random()::text || clock_timestamp()::text)::uuid WHERE code is NULL';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'roles',
    'code',
    {
      type: Sequelize.STRING(100),
      unique: true,
    },
  )
    .then(() => queryInterface.sequelize.query(updateQuery))
    .then(() => queryInterface.changeColumn(
      'roles',
      'code',
      {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    )),
  down: queryInterface => queryInterface.removeColumn(
    'roles',
    'code',
  ),
};
