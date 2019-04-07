import handleError from './handleError';

const resolvers = {
  Query: {
    recipes: async (_source, _args, { dataSources }) => {
      const recipes = await dataSources.db.Recipe.findAll();
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
  },
  Recipe: {
    createdBy: (parent, _args, { dataSources }) => dataSources.db.User.findById(parent.createdBy),
  },
};

export default resolvers;
