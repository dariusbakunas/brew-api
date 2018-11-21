const resolvers = {
  Query: {
    flavorProfiles:
      async (_source, _args, { dataSources }) => dataSources.db.FlavorProfile.findAll(),
  },
};

export default resolvers;
