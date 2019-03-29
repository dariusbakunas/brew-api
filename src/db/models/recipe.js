module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.ENUM,
      values: ['ALL_GRAIN', 'EXTRACT', 'PARTIAL_MASH', 'CIDER', 'MEAD', 'WINE'],
    },
    batchSize: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'recipes',
  });

  return Recipe;
};
