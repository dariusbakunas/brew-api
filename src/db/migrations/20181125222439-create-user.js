module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM('NEW', 'ACTIVE', 'INACTIVE'),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }).then(() => queryInterface.addConstraint('users', ['username'], {
    type: 'unique',
    name: 'users_username_unique_constraint',
  })).then(() => queryInterface.addConstraint('users', ['email'], {
    type: 'unique',
    name: 'users_email_unique_constraint',
  })),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
