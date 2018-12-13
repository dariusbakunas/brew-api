module.exports = (sequelize, DataTypes) => {
  const Invitation = sequelize.define('Invitation', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'invitations',
    timestamps: false,
  });
  return Invitation;
};
