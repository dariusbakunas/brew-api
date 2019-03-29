const resolvers = {
  Query: {
    recipes: async (_source, _args, { dataSources }) => {
      const recipes = await dataSources.db.Recipe.findAll();
      return recipes;
    },
  },
};

export default resolvers;
