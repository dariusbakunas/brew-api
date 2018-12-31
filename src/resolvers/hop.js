import { UserInputError } from 'apollo-server-express';
import Sequelize from 'sequelize';
import handleError from './handleError';
import { getPagedQuery, getNextCursor } from './paging';

const resolvers = {
  Query: {
    hops: async (_source, {
      cursor: encodedCursor, limit, sortBy, sortDirection,
    }, { dataSources }) => {
      const query = getPagedQuery(encodedCursor, limit, sortBy, sortDirection);
      const hops = await dataSources.db.Hop.findAll(query);
      let nextCursor = null;

      // nextCursor is only available if there is another page
      if (hops.length > limit) {
        nextCursor = getNextCursor(hops.pop(), sortBy);
      }

      return {
        data: hops,
        pageInfo: {
          nextCursor,
          currentCursor: encodedCursor,
        },
      };
    },
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
        handleError(err);
      }),
    updateHop: async (_source, { id, input }, { dataSources }) => {
      const result = await dataSources.db.Hop.update(
        input,
        {
          where: {
            id: {
              [Sequelize.Op.eq]: id,
            },
          },
          returning: true,
          plain: true,
        },
      );

      return result[1].dataValues;
    },
    removeHop: async (_source, { id }, { dataSources }) => {
      const hop = await dataSources.db.Hop.findById(id);

      if (!hop) {
        throw new UserInputError('Hop does not exist');
      }

      await hop.destroy();
      return id;
    },
  },
  Hop: {
    // TODO: use data loaders to optimize
    origin: (parent, _args, { dataSources }) => {
      return dataSources.db.Country.findById(parent.originId);
    },
  },
};

export default resolvers;
