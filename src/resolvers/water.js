import Sequelize from 'sequelize';
import { UserInputError } from 'apollo-server-express';
import { getPagedQuery, getNextCursor } from './paging';
import handleError from './handleError';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

const convertSortableColumn = column => ({
  NAME: 'name',
}[column]);

const resolvers = {
  Query: {
    water: async (_source, {
      cursor: encodedCursor, limit, sortBy, sortDirection,
    }, { dataSources }) => {
      const sortByColumn = convertSortableColumn(sortBy);

      const query = getPagedQuery(encodedCursor, limit, sortByColumn, sortDirection);
      const water = await dataSources.db.Water.findAll(query);
      let nextCursor = null;

      if (water.length > limit) {
        nextCursor = getNextCursor(water.pop(), sortByColumn);
      }

      return {
        data: water,
        pageInfo: {
          nextCursor,
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
