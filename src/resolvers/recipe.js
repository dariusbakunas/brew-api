import { UserInputError } from 'apollo-server-express';
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
        const recipe = await dataSources.db.Recipe.findByPk(id);

        return recipe;
      } catch (err) {
        return handleError(err);
      }
    },
  },
  Mutation: {
    createRecipe: async (_source, { input }, { dataSources, user }) => {
      const recipeInput = {
        ...input,
        createdBy: user.id,
      };

      let recipe;

      await dataSources.db.sequelize.transaction(async (t) => {
        recipe = await dataSources.db.Recipe.create(recipeInput, { transaction: t });
        await Promise.all(input.fermentables.map(({ id: fermentableId, unit, amount }) => recipe
          .addFermentable(fermentableId, { through: { unit, amount }, transaction: t })));
      });

      return recipe ? dataSources.db.Recipe.findByPk(recipe.id) : null;
    },
    updateRecipe: async (_source, { id, input }, { dataSources }) => {
      await dataSources.db.sequelize.transaction(async (t) => {
        await dataSources.db.Recipe.update(
          input,
          {
            where: {
              id: {
                [Sequelize.Op.eq]: id,
              },
            },
            transaction: t,
          },
        );

        const recipe = await dataSources.db.Recipe.findByPk(id, { transaction: t });

        await recipe.setFermentables([]);

        await Promise.all(input.fermentables.map(({ id: fermentableId, unit, amount }) => recipe
          .addFermentable(fermentableId, { through: { unit, amount }, transaction: t })));
      });

      return dataSources.db.Recipe.findByPk(id);
    },
    removeRecipe: async (_source, { id }, { dataSources }) => {
      const recipe = await dataSources.db.Recipe.findByPk(id);

      await dataSources.db.sequelize.transaction(async (t) => {
        await recipe.setFermentables([], { transaction: t });
        await recipe.destroy({ transaction: t });
      });

      if (!recipe) {
        throw new UserInputError('Recipe does not exist');
      }

      return id;
    },
  },
  Recipe: {
    createdBy: (parent, _args, { dataSources }) => dataSources.db.User.findByPk(parent.createdBy),
    fermentables: async (parent, _args, { dataSources }) => {
      const fermentables = await parent.getFermentables();
      return fermentables.map((fermentable) => ({
        ...fermentable.dataValues,
        ...fermentable.RecipeFermentable.dataValues,
      }));
    },
  },
};

export default resolvers;
