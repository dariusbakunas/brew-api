import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Query: {
    countries: async (_source, _args, { dataSources }) => {
      const countries = await dataSources.db.Country.query()
        .select()
        .orderBy('name');
      return countries.map(country => ({
        ...country,
        id: `${country.id}`,
      }));
    },
  },
};

export default resolvers;
