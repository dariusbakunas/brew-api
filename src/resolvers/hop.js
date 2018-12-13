import { UserInputError, ApolloError } from 'apollo-server-express';
import Sequelize from 'sequelize';

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
    createHop: (_source, { input }, { dataSources }) => dataSources.db.Hop.create(input)
      .then(hop => dataSources.db.Hop.findById(hop.id, {
        include: [{
          model: dataSources.db.Country,
          as: 'origin',
        }],
      }))
      .catch((err) => {
        const message = err.original ? err.original.message : err.message;

        if (err instanceof Sequelize.ValidationError) {
          const { errors } = err;
          throw new UserInputError(message, {
            errors: errors.map(error => ({
              message: error.message,
              type: error.type,
              path: error.path,
              value: error.value,
            })),
          });
        } else {
          throw new ApolloError(message);
        }
      })
    ,
  },
};

export default resolvers;
