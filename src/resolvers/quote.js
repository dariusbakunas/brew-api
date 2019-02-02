const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

const { fn } = Sequelize;

const resolvers = {
  Query: {
    randomQuote: async (_source, _args, { dataSources }) => dataSources.db.Quote.find({
      order: [
        fn(config.dialect === 'mysql' ? 'rand' : 'random'),
      ],
    }),
  },
};

export default resolvers;
