module.exports = (sequelize, DataTypes) => {
  const Hop = sequelize.define('Hop', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    aaLow: {
      allowNull: true,
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 100,
      },
    },
    aaHigh: {
      allowNull: true,
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 100,
      },
    },
    betaLow: {
      allowNull: true,
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 100,
      },
    },
    betaHigh: {
      allowNull: true,
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 100,
      },
    },
    aroma: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    bittering: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    description: DataTypes.TEXT,
  }, {
    tableName: 'hops',
  });

  Hop.associate = (models) => {
    Hop.belongsTo(
      models.Country,
      {
        foreignKey: 'originId',
        as: 'origin',
      },
    );
  };
  return Hop;
};
