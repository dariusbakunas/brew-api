module.exports = (sequelize, DataTypes) => {
  const Grain = sequelize.define('Fermentable', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    category: {
      allowNull: false,
      type: DataTypes.ENUM('ADJUNCT', 'DRY_EXTRACT', 'FRUIT', 'JUICE', 'GRAIN', 'LIQUID_EXTRACT', 'SUGAR'),
    },
    type: {
      type: DataTypes.ENUM('BASE', 'CARAMEL_CRYSTAL', 'ADJUNCT', 'KILNED_TOASTED', 'ROASTED', 'RAW', 'GLUTEN_FREE'),
    },
    color: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    potential: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    description: DataTypes.TEXT,
  }, {
    tableName: 'fermentables',
  });

  Grain.associate = (models) => {
    Grain.belongsTo(
      models.Country,
      {
        foreignKey: 'originId',
        as: 'origin',
      },
    );
  };

  return Grain;
};
