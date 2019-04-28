import Sequelize from 'sequelize';
import { UserInputError } from 'apollo-server-express';
import { getPagedQuery, getCursor, getPagingQuery, getPagingCursors } from './paging';
import handleError from './handleError';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

const PRIMARY_KEY_COL = 'id';

const convertSortableColumn = column => ({
  NAME: 'name',
}[column]);

const resolvers = {
  Query: {
    water: async (_source, {
      nextCursor: encodedNextCursor, prevCursor: encodedPrevCursor, limit, sortBy, sortDirection,
    }, { dataSources }) => {
      const sortByColumn = convertSortableColumn(sortBy);
      const where = {}; // TODO: enable where clause

      const query = getPagingQuery(
        encodedPrevCursor, encodedNextCursor, sortByColumn,
        sortDirection, PRIMARY_KEY_COL, limit, where,
      );
      const water = await dataSources.db.Water.findAll(query);

      const hasMore = water.length > limit;

      if (hasMore) {
        water.pop();
      }

      if (encodedPrevCursor) {
        water.reverse();
      }

      const cursors = getPagingCursors(
        !!encodedNextCursor, !!encodedPrevCursor, water, hasMore, sortByColumn, PRIMARY_KEY_COL,
      );

      return {
        data: water,
        pageInfo: {
          ...cursors,
        },
      };
    },
  },
  Mutation: {
    createWater: (_source, { input }, { dataSources }) => dataSources.db.Water.create(input)
      .then(water => dataSources.db.Water.findByPk(water.id))
      .catch((err) => {
        handleError(err);
      }),
    updateWater: async (_source, { id, input }, { dataSources }) => {
      const result = await dataSources.db.Water.update(
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

      return config.dialect === 'postgres' ? result[1].dataValues : dataSources.db.Water.findByPk(id);
    },
    removeWater: async (_source, { id }, { dataSources }) => {
      const water = await dataSources.db.Water.findByPk(id);

      if (!water) {
        throw new UserInputError('Water does not exist');
      }

      await water.destroy();
      return id;
    },
  },
};

export default resolvers;
