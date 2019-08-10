module.exports = (sequelize, DataTypes) => {
  const RecipeFermentable = sequelize.define(
    "RecipeFermentable",
    {
      unit: {
        allowNull: false,
        type: DataTypes.ENUM("LB", "OZ"),
      },
      amount: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: "recipe_fermentables",
      timestamps: false,
    }
  );

  return RecipeFermentable;
};
