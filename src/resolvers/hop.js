const resolvers = {
  Query: {
    hops: async (_source, _args, { dataSources }) => dataSources.db.Hop.findAll({
      include: [{
        model: dataSources.db.Country,
        as: 'origin',
      }],
    }),
  },
  Mutation: {
    addHop: async (_source, { input }, { dataSources }) => dataSources.db.Hop.create(input),
  },
};

export default resolvers;
