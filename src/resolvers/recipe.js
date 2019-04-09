import Sequelize from 'sequelize';
import handleError from './handleError';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

const resolvers = {
  Query: {
    recipes: async (_source, _args, { dataSources, user }) => {
      const recipes = await dataSources.db.Recipe.findAll({
        where: {
          createdBy: user.id,
        },
      });
      return recipes;
    },
    recipe: async (_source, { id }, { dataSources }) => {
      try {
        const recipe = await dataSources.db.Recipe.findById(id, {
          include: [{
            model: dataSources.db.User,
          }],
        });

        return recipe;
      } catch (err) {
        return handleError(err);
      }
    },
  },
  Mutation: {
    createRecipe: (_source, { input }, { dataSources, user }) => {
      const recipeInput = {
        ...input,
        createdBy: user.id,
      };

      return dataSources.db.Recipe.create(recipeInput)
        .then(recipe => dataSources.db.Recipe.findById(recipe.id, {
          include: [{
            model: dataSources.db.User,
            as: 'createdBy',
          }],
        }))
        .catch((err) => {
          handleError(err);
        });
    },
    updateRecipe: async (_source, { id, input }, { dataSources }) => {
      const result = await dataSources.db.Recipe.update(
        input,
        {
          where: {
            id: {
              [Sequelize.Op.eq]: id,
            },
          },
          returning: true,
          plain: true,
        },
      );

      return config.dialect === 'postgres' ? result[1].dataValues : dataSources.db.Recipe.findById(id);
    },
  },
  Recipe: {
    createdBy: (parent, _args, { dataSources }) => dataSources.db.User.findById(parent.createdBy),
  },
};

export default resolvers;
