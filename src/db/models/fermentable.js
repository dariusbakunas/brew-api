module.exports = (sequelize, DataTypes) => {
  const Fermentable = sequelize.define('Fermentable', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    category: {
      allowNull: false,
      type: DataTypes.ENUM('ADJUNCT', 'DRY_EXTRACT', 'FRUIT', 'JUICE', 'GRAIN', 'LIQUID_EXTRACT', 'SUGAR'),
    },
    type: {
      type: DataTypes.ENUM('BASE', 'COLOR', 'CARAMEL_CRYSTAL', 'ROASTED', 'ADJUNCT', 'SPECIALTY'),
    },
    color: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    yield: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 100,
      },
    },
    description: DataTypes.TEXT,
  }, {
    tableName: 'fermentables',
  });

  Fermentable.associate = (models) => {
    Fermentable.belongsTo(
      models.Country,
      {
        foreignKey: 'originId',
        as: 'origin',
      },
    );

    Fermentable.belongsToMany(
      models.Recipe,
      {
        through: models.RecipeFermentable,
      },
    );
  };

  return Fermentable;
};
