module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['NEW', 'ACTIVE', 'INACTIVE'],
      defaultValue: 'NEW',
    },
  }, {
    tableName: 'users',
  });

  return User;
};
