import { UserInputError } from 'apollo-server-express';
import Sequelize from 'sequelize';
import atob from 'atob';
import btoa from 'btoa';

const PRIMARY_KEY_COL = 'id';

const getPagingQuery = (cursor, cursorOrderOp, sortBy) => {
  if (sortBy !== PRIMARY_KEY_COL) {
    return {
      [Sequelize.Op.or]: [
        {
          [sortBy]: {
            [cursorOrderOp]: cursor[0],
          },
        },
        {
          [sortBy]: cursor[0],
          [PRIMARY_KEY_COL]: {
            [cursorOrderOp]: cursor[1],
          },
        },
      ],
    };
  }

  return {
    [PRIMARY_KEY_COL]: {
      [cursorOrderOp]: cursor[0],
    },
  };
};

export const getPagedQuery = (encodedCursor, limit, sortBy, sortDirection, where = {}) => {
  if (limit > 100) {
    throw new UserInputError('Only 100 items can be requested at a time');
  }

  let pagingQuery = null;

  if (encodedCursor) {
    const cursorOrderOp = sortDirection === 'ASCENDING' ? Sequelize.Op.gt : Sequelize.Op.lt;
    const cursor = JSON.parse(atob(encodedCursor));
    pagingQuery = getPagingQuery(cursor, cursorOrderOp, sortBy);
  }

  const whereQuery = pagingQuery
    ? { [Sequelize.Op.and]: [pagingQuery, where] }
    : where;

  const direction = sortDirection === 'ASCENDING' ? 'ASC' : 'DESC';

  const order = [
    [sortBy, direction],
    (sortBy !== PRIMARY_KEY_COL ? [PRIMARY_KEY_COL, direction] : []),
  ];

  const query = {
    // should get one extra item for next cursor if available
    limit: limit + 1,
    order,
    where: whereQuery,
  };

  return query;
};

export const getNextCursor = (item, sortBy) => {
  let nextCursor = null;

  if (sortBy !== PRIMARY_KEY_COL) {
    nextCursor = [item[sortBy], item[PRIMARY_KEY_COL]];
  } else {
    nextCursor = [item[PRIMARY_KEY_COL]];
  }

  return btoa(JSON.stringify(nextCursor));
};
