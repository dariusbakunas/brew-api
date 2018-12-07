const Sequelize = require('sequelize');

const { fn } = Sequelize;

const resolvers = {
  Query: {
    randomQuote: async (_source, _args, { dataSources }) => {
      return dataSources.db.Quote.find({
        order: [
          fn('RANDOM'),
        ],
      });
    },
  },
};

export default resolvers;
