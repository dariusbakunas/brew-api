import { UserInputError } from 'apollo-server-express';
import Sequelize from 'sequelize';
import handleError from './handleError';
import { getPagedQuery, getNextCursor } from './paging';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

const convertSortableColumn = column => ({
  NAME: 'name',
}[column]);

const resolvers = {
  Query: {
    hops: async (_source, {
      cursor: encodedCursor, limit, sortBy, sortDirection,
    }, { dataSources }) => {
      const sortByColumn = convertSortableColumn(sortBy);
      const query = getPagedQuery(encodedCursor, limit, sortByColumn, sortDirection);
      const hops = await dataSources.db.Hop.findAll(query);
      let nextCursor = null;

      // nextCursor is only available if there is another page
      if (hops.length > limit) {
        nextCursor = getNextCursor(hops.pop(), sortByColumn);
      }

      return {
        data: hops,
        pageInfo: {
          nextCursor,
        },
      };
    },
  },
  Mutation: {
    createHop: (_source, { input }, { dataSources }) => dataSources.db.Hop.create(input)
      .then(hop => dataSources.db.Hop.findByPk(hop.id, {
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

      return config.dialect === 'postgres' ? result[1].dataValues : dataSources.db.Hop.findByPk(id);
    },
    removeHop: async (_source, { id }, { dataSources }) => {
      const hop = await dataSources.db.Hop.findByPk(id);

      if (!hop) {
        throw new UserInputError('Hop does not exist');
      }

      await hop.destroy();
      return id;
    },
  },
  Hop: {
    // TODO: use data loaders to optimize
    origin: (parent, _args, { dataSources }) => dataSources.db.Country.findByPk(parent.originId),
  },
};

export default resolvers;
