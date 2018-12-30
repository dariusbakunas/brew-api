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
    pagedHops: async (_source, {
      cursor, limit, sortBy, sortDirection,
    }, { dataSources }) => {
      const query = {
        limit: limit + 1,
      };

      const direction = sortDirection === 'ASCENDING' ? 'ASC' : 'DESC';
      const whereOp = sortDirection === 'ASCENDING' ? Sequelize.Op.gte : Sequelize.Op.lte;

      query.order = [
        ['id', direction],
      ];

      if (sortBy) {
        query.order.unshift([sortBy, direction]);
      }

      if (cursor) {
        const cobj = JSON.parse(atob(cursor));

        query.where = cobj.reduce((acc, field) => {
          acc[field.key] = {
            [whereOp]: field.value,
          };

          return acc;
        }, {});
      }

      const hops = await dataSources.db.Hop.findAll(query);
      let nextCursor = null;

      // nextCursor is only available if there is another page
      if (hops.length > limit) {
        const nextHop = hops[hops.length - 1];

        nextCursor = [
          { key: 'id', value: nextHop.id },
        ];

        if (sortBy) {
          nextCursor.unshift({ key: sortBy, value: nextHop[sortBy] });
        }

        hops.splice(-1, 1);
      }

      return {
        hops,
        metadata: {
          nextCursor: nextCursor ? btoa(JSON.stringify(nextCursor)) : null,
          currentCursor: cursor,
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
