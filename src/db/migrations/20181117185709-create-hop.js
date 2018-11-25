module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('hops', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    aaLow: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    aaHigh: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    description: Sequelize.TEXT,
    usage: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    flavorProfile: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    originId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'countries',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }).then(() => queryInterface.addIndex('hops', ['name', 'originId'])),
  down: queryInterface => queryInterface.dropTable('hops'),
};
