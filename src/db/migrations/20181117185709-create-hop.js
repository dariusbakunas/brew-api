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
    alpha: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    beta: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    description: Sequelize.TEXT,
    usage: {
      allowNull: false,
      type: Sequelize.STRING,
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
  }),
  down: queryInterface => queryInterface.dropTable('hops'),
};
