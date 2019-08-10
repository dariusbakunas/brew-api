module.exports = (sequelize, DataTypes) => {
  const YeastLab = sequelize.define(
    "YeastLab",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "yeast_labs",
      timestamps: false,
    }
  );

  return YeastLab;
};
