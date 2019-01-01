module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('yeast_labs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
  }),
  down: queryInterface => queryInterface.dropTable('yeast_labs'),
};
