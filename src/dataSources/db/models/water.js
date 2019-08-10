module.exports = (sequelize, DataTypes) => {
  const Water = sequelize.define(
    "Water",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      pH: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      alkalinity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      calcium: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      magnesium: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      sodium: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      sulfate: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      chloride: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      bicarbonate: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      description: DataTypes.TEXT,
    },
    {
      tableName: "water",
    }
  );

  return Water;
};
