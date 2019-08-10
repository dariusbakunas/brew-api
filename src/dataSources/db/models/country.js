export default (sequelize, DataTypes) =>
  sequelize.define(
    "Country",
    {
      code: {
        allowNull: false,
        type: DataTypes.STRING(2),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(80),
      },
    },
    {
      timestamps: false,
      tableName: "countries",
    }
  );
