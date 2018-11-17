const resolvers = {
  Query: {
    countries: async (_source, _args, { dataSources }) => dataSources.db.Country.findAll(),
  },
};

export default resolvers;
