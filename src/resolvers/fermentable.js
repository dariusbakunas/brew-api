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
    fermentables: async (_source, {
      cursor: encodedCursor, limit, sortBy, sortDirection,
    }, { dataSources }) => {
      const sortByColumn = convertSortableColumn(sortBy);

      const query = getPagedQuery(encodedCursor, limit, sortByColumn, sortDirection);
      const fermentables = await dataSources.db.Fermentable.findAll(query);
      let nextCursor = null;

      if (fermentables.length > limit) {
        nextCursor = getNextCursor(fermentables.pop(), sortByColumn);
      }

      return {
        data: fermentables,
        pageInfo: {
          nextCursor,
        },
      };
    },
  },
  Mutation: {
    createFermentable: (_source, { input }, { dataSources }) => dataSources.db.Fermentable.create(input)
      .then(fermentable => dataSources.db.Fermentable.findById(fermentable.id, {
        include: [{
          model: dataSources.db.Country,
          as: 'origin',
        }],
      }))
      .catch((err) => {
        handleError(err);
      }),
    updateFermentable: async (_source, { id, input }, { dataSources }) => {
      const result = await dataSources.db.Fermentable.update(
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

      return config.dialect === 'postgres' ? result[1].dataValues : dataSources.db.Fermentable.findById(id);
    },
    removeFermentable: async (_source, { id }, { dataSources }) => {
      const fermentable = await dataSources.db.Fermentable.findById(id);

      if (!fermentable) {
        throw new UserInputError('Fermentable does not exist');
      }

      await fermentable.destroy();
      return id;
    },
  },
  Fermentable: {
    origin: (parent, _args, { dataSources }) => {
      return dataSources.db.Country.findById(parent.originId);
    },
  },
};

export default resolvers;
