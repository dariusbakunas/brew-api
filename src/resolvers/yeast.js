import Sequelize from 'sequelize';
import { UserInputError } from 'apollo-server-express';
import { getPagedQuery, getCursor, getPagingQuery, getPagingCursors } from './paging';
import handleError from './handleError';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

const convertSortableColumn = (column) => {
  return {
    NAME: 'name',
  }[column];
};

const PRIMARY_KEY_COL = 'id';

const resolvers = {
  Query: {
    yeast: async (_source, {
      nextCursor: encodedNextCursor, prevCursor: encodedPrevCursor, limit, sortBy, sortDirection,
    }, { dataSources }) => {
      const sortByColumn = convertSortableColumn(sortBy);
      const where = {}; // TODO: enable where clause

      const query = getPagingQuery(
        encodedPrevCursor, encodedNextCursor, sortByColumn,
        sortDirection, PRIMARY_KEY_COL, limit, where,
      );
      const yeast = await dataSources.db.Yeast.findAll(query);

      const hasMore = yeast.length > limit;

      if (hasMore) {
        yeast.pop();
      }

      if (encodedPrevCursor) {
        yeast.reverse();
      }

      const cursors = getPagingCursors(
        !!encodedNextCursor, !!encodedPrevCursor, yeast, hasMore, sortByColumn, PRIMARY_KEY_COL,
      );

      return {
        data: yeast,
        pageInfo: {
          ...cursors,
        },
      };
    },
    yeastLabs: async (_source, _args, { dataSources }) => dataSources.db.YeastLab.findAll({
      order: [
        ['name', 'ASC'],
      ],
    }),
  },
  Mutation: {
    createYeast: (_source, { input }, { dataSources }) => dataSources.db.Yeast.create(input)
      .then(yeast => dataSources.db.Yeast.findByPk(yeast.id, {
        include: [{
          model: dataSources.db.YeastLab,
          as: 'lab',
        }],
      }))
      .catch((err) => {
        handleError(err);
      }),
    updateYeast: async (_source, { id, input }, { dataSources }) => {
      const result = await dataSources.db.Yeast.update(
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

      return config.dialect === 'postgres' ? result[1].dataValues : dataSources.db.Yeast.findByPk(id);
    },
    removeYeast: async (_source, { id }, { dataSources }) => {
      const yeast = await dataSources.db.Yeast.findByPk(id);

      if (!yeast) {
        throw new UserInputError('Hop does not exist');
      }

      await yeast.destroy();
      return id;
    },
  },
  Yeast: {
    lab: (parent, _args, { dataSources }) => {
      return dataSources.db.YeastLab.findByPk(parent.labId);
    },
  },
};

export default resolvers;
