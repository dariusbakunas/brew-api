module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('invitations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    code: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  }).then(() => queryInterface.addConstraint('invitations', ['email'], {
    type: 'unique',
    name: 'invitations_email_unique_constraint',
  })),
  down: queryInterface => queryInterface.dropTable('invitations'),
};
