import { UserInputError } from 'apollo-server-express';
import Sequelize from 'sequelize';
import handleError from './handleError';
import { getPagingQuery, getPagingCursors } from './paging';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

const convertSortableColumn = column => ({
  NAME: 'name',
}[column]);

const PRIMARY_KEY_COL = 'id';

const resolvers = {
  Query: {
    hops: async (_source, {
      nextCursor: encodedNextCursor, prevCursor: encodedPrevCursor, limit, sortBy, sortDirection,
    }, { dataSources }) => {
      const sortByColumn = convertSortableColumn(sortBy);
      const where = {}; // TODO: enable where clause

      const query = getPagingQuery(
        encodedPrevCursor, encodedNextCursor, sortByColumn,
        sortDirection, PRIMARY_KEY_COL, limit, where,
      );
      const hops = await dataSources.db.Hop.findAll(query);

      const hasMore = hops.length > limit;

      if (hasMore) {
        hops.pop();
      }

      if (encodedPrevCursor) {
        hops.reverse();
      }

      const cursors = getPagingCursors(
        !!encodedNextCursor, !!encodedPrevCursor, hops, hasMore, sortByColumn, PRIMARY_KEY_COL,
      );

      return {
        data: hops,
        pageInfo: {
          ...cursors,
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
