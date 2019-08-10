module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    "Role",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      code: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {
      tableName: "roles",
      timestamps: false,
    }
  );

  return role;
};
