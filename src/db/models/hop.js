module.exports = (sequelize, DataTypes) => {
  const Hop = sequelize.define('Hop', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    aaLow: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    aaHigh: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    description: DataTypes.TEXT,
    usage: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    flavorProfile: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
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
