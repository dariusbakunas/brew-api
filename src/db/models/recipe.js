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
    boilTime: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    source: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
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

  Recipe.associate = (models) => {
    Recipe.belongsTo(
      models.User,
      {
        foreignKey: 'id',
        as: 'createdBy',
      },
    );
  };

  return Recipe;
};
