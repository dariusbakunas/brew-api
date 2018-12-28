import { UserInputError } from 'apollo-server-express';
import Sequelize from 'sequelize';
import btoa from 'btoa';
import atob from 'atob';
import handleError from './handleError';

const resolvers = {
  Query: {
    hops: async (_source, _args, { dataSources }) => dataSources.db.Hop.findAll({
      include: [{
        model: dataSources.db.Country,
        as: 'origin',
      }],
    }),
    pagedHops: async (_source, { cursor, limit }, { dataSources }) => {
      const query = {
        include: [{
          model: dataSources.db.Country,
          as: 'origin',
        }],
        limit: limit + 1,
      };

      if (cursor) {
        query.where = {
          id: {
            [Sequelize.Op.gte]: atob(cursor),
          },
        };
      }

      const hops = await dataSources.db.Hop.findAll(query);
      let nextCursor = null;

      if (hops.length > limit) {
        nextCursor = btoa(hops[hops.length - 1].id);
        hops.splice(-1, 1);
      }

      return {
        hops,
        metadata: {
          nextCursor,
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
    origin: (parent, _args, { dataSources }) => dataSources.db.Country.findById(parent.originId),
  },
};

export default resolvers;
