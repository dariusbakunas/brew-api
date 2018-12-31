import { UserInputError } from 'apollo-server-express';
import Sequelize from 'sequelize';
import atob from 'atob';
import btoa from 'btoa';

export const getPagedQuery = (encodedCursor, limit, sortBy, sortDirection) => {
  if (limit > 100) {
    throw new UserInputError('Only 100 items can be requested at a time');
  }

  const query = {
    // should get one extra item for next cursor if available
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

  if (encodedCursor) {
    const cursor = JSON.parse(atob(encodedCursor));

    query.where = cursor.reduce((acc, field) => {
      acc[field.key] = {
        [whereOp]: field.value,
      };

      return acc;
    }, {});
  }

  return query;
};

export const getNextCursor = (item, sortBy) => {
  const nextCursor = [
    { key: 'id', value: item.id },
  ];

  if (sortBy) {
    nextCursor.unshift({ key: sortBy, value: item[sortBy] });
  }

  return btoa(JSON.stringify(nextCursor));
};
