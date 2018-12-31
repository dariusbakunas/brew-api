module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('Role', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'roles',
    timestamps: false,
  });

  return role;
};
