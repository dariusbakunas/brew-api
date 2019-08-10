module.exports = (sequelize, DataTypes) => {
  const Yeast = sequelize.define(
    "Yeast",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      form: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ["LIQUID", "DRY"],
      },
      maxTemp: {
        type: DataTypes.FLOAT,
      },
      minTemp: {
        type: DataTypes.FLOAT,
      },
      maxAttenuation: {
        type: DataTypes.FLOAT,
      },
      minAttenuation: {
        type: DataTypes.FLOAT,
      },
      flocculation: {
        type: DataTypes.ENUM,
        values: ["LOW", "MEDIUM", "HIGH"],
        allowNull: false,
        defaultValue: "MEDIUM",
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ["ALE", "CHAMPAGNE", "LAGER", "WHEAT", "WINE"],
      },
      description: DataTypes.TEXT,
    },
    {
      tableName: "yeast",
    }
  );

  Yeast.associate = (models) => {
    Yeast.belongsTo(models.YeastLab, {
      foreignKey: "labId",
      as: "lab",
    });
  };

  return Yeast;
};
