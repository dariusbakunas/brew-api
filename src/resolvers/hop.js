const resolvers = {
  Query: {
    hops: async (_source, _args, { dataSources }) => dataSources.db.Hop.findAll(),
  },
};

export default resolvers;
