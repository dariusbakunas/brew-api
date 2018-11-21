module.exports = (sequelize, DataTypes) => {
  const Hop = sequelize.define('Hop', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    alpha: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    beta: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    description: DataTypes.TEXT,
    usage: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'hops',
  });
  Hop.associate = (models) => {
    Hop.belongsTo(
      models.Country,
      {
        foreignKey: 'originId',
      },
    );

    Hop.belongsToMany(models.FlavorProfile, { through: 'hop_flavor_profiles', as: 'flavorProfile' });
  };
  return Hop;
};
