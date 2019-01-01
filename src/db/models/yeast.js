module.exports = (sequelize, DataTypes) => {
  const Yeast = sequelize.define('Yeast', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    form: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['Liquid', 'Dry'],
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['Ale', 'Champagne', 'Lager', 'Wheat', 'Wine'],
    },
    description: DataTypes.TEXT,
  });

  Yeast.associate = (models) => {
    Yeast.belongsTo(
      models.YeastLab,
      {
        foreignKey: 'labId',
        as: 'lab',
      },
    );
  };
};
