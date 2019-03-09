import Sequelize from 'sequelize';
import { UserInputError } from 'apollo-server-express';
import { getPagedQuery, getNextCursor } from './paging';
import handleError from './handleError';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

const convertSortableColumn = (column) => {
  return {
    NAME: 'name',
  }[column];
};

const resolvers = {
  Query: {
    yeast: async (_source, {
      cursor: encodedCursor, limit, sortBy, sortDirection,
    }, { dataSources }) => {
      const sortByColumn = convertSortableColumn(sortBy);

      const query = getPagedQuery(encodedCursor, limit, sortByColumn, sortDirection);
      const yeast = await dataSources.db.Yeast.findAll(query);
      let nextCursor = null;

      if (yeast.length > limit) {
        nextCursor = getNextCursor(yeast.pop(), sortByColumn);
      }

      return {
        data: yeast,
        pageInfo: {
          nextCursor,
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
      .then(yeast => dataSources.db.Yeast.findById(yeast.id, {
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

      return config.dialect === 'postgres' ? result[1].dataValues : dataSources.db.Yeast.findById(id);
    },
    removeYeast: async (_source, { id }, { dataSources }) => {
      const yeast = await dataSources.db.Yeast.findById(id);

      if (!yeast) {
        throw new UserInputError('Hop does not exist');
      }

      await yeast.destroy();
      return id;
    },
  },
  Yeast: {
    lab: (parent, _args, { dataSources }) => {
      return dataSources.db.YeastLab.findById(parent.labId);
    },
  },
};

export default resolvers;
