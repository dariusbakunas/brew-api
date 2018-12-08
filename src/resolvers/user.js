const Sequelize = require('sequelize');
const { ApolloError, AuthenticationError, UserInputError } = require('apollo-server-express');

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
    register: (_source, { input }, { dataSources, user }) => {
      const {
        email, firstName, lastName, username, code,
      } = input;

      if (input.email !== user.email) {
        // can only register your own user
        throw new AuthenticationError('Registration email mismatch');
      }

      return dataSources.db.User.create({
        email,
        firstName,
        lastName,
        username,
        status: 'NEW',
      }).catch(Sequelize.ValidationError, (err) => {
        if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
          throw new UserInputError('Input Error', {
            fields: err.errors.reduce((acc, error) => {
              acc[error.path] = error.message;
              return acc;
            }, {}),
          });
        } else {
          throw new ApolloError(err.message);
        }
      });
    },
  },
};

export default resolvers;
