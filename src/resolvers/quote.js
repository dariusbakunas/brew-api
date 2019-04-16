const resolvers = {
  Query: {
    randomQuote: async (_source, _args, { dataSources }) => {
      const count = await dataSources.db.Quote.count();
      const id = Math.floor(Math.random() * count) + 1;
      return dataSources.db.Quote.findByPk(id);
    },
  },
};

export default resolvers;
