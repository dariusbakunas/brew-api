module.exports = (sequelize, DataTypes) => {
  const Quote = sequelize.define('Quote', {
    author: DataTypes.STRING,
    text: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    tableName: 'quotes',
  });

  return Quote;
};
