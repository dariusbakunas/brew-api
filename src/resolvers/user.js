const Sequelize = require('sequelize');

const { Op } = Sequelize;

const resolvers = {
  Query: {
    users: async (_source, _args, { dataSources }) => dataSources.db.User.findAll(),
    userByEmail: async (_source, { email }, { dataSources }) => dataSources.db.User.find({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
      plain: true,
    }),
  },
  Mutation: {
    createUser: (_source, { input }, { dataSources }) => dataSources.db.User.create(input),
  },
};

export default resolvers;
