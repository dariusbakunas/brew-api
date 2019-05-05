import Sequelize from 'sequelize';
import { UserInputError } from 'apollo-server-express';
import { getPagingCursors, getPagingQuery } from './paging';
import handleError from './handleError';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

const PRIMARY_KEY_COL = 'id';

const convertSortableColumn = column => ({
  ID: 'id',
  NAME: 'name',
}[column]);

const resolvers = {
  Query: {
    fermentables: async (_source, {
      nextCursor: encodedNextCursor, prevCursor: encodedPrevCursor, filter, limit, sortBy = 'ID', sortDirection,
    }, { dataSources }) => {
      const sortByColumn = convertSortableColumn(sortBy);

      const where = {}; // TODO: enable where clause

      if (filter && filter.name) {
        where.name = {
          [Sequelize.Op.like]: `%${filter.name}%`,
        };
      }

      const query = getPagingQuery(
        encodedPrevCursor, encodedNextCursor, sortByColumn,
        sortDirection, PRIMARY_KEY_COL, limit, where,
      );

      const fermentables = await dataSources.db.Fermentable.findAll(query);

      const hasMore = fermentables.length > limit;

      if (hasMore) {
        fermentables.pop();
      }

      if (encodedPrevCursor) {
        fermentables.reverse();
      }

      const cursors = getPagingCursors(
        !!encodedNextCursor, !!encodedPrevCursor, fermentables,
        hasMore, sortByColumn, PRIMARY_KEY_COL,
      );

      return {
        data: fermentables,
        pageInfo: {
          ...cursors,
        },
      };
    },
  },
  Mutation: {
    createFermentable: (_source, { input }, { dataSources }) => dataSources.db.Fermentable.create(input)
      .then(fermentable => dataSources.db.Fermentable.findByPk(fermentable.id, {
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

      return config.dialect === 'postgres' ? result[1].dataValues : dataSources.db.Fermentable.findByPk(id);
    },
    removeFermentable: async (_source, { id }, { dataSources }) => {
      const fermentable = await dataSources.db.Fermentable.findByPk(id);

      if (!fermentable) {
        throw new UserInputError('Fermentable does not exist');
      }

      await fermentable.destroy();
      return id;
    },
  },
  Fermentable: {
    origin: (parent, _args, { dataSources }) => {
      return dataSources.db.Country.findByPk(parent.originId);
    },
    potential: (parent, _args, { dataSources }) => {
      const potential = 1 + (parent.yield / 100) * 0.04621;
      return potential.toFixed(3); // TODO: add potential formula
    },
  },
};

export default resolvers;
