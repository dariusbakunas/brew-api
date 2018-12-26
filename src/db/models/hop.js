module.exports = (sequelize, DataTypes) => {
  const Hop = sequelize.define('Hop', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    aaLow: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    aaHigh: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    betaLow: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    betaHigh: {
      allowNull: true,
      type: DataTypes.FLOAT,
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
