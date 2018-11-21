module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('hop_flavor_profiles', {
    hopId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'hops',
        key: 'id',
      },
      allowNull: false,
    },
    flavorProfileId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'flavor_profiles',
        key: 'id',
      },
      allowNull: false,
    },
  }).then(() => queryInterface.addIndex('hop_flavor_profiles', ['hopId', 'flavorProfileId'])),

  down: queryInterface => queryInterface.dropTable('hop_flavor_profiles'),
};
