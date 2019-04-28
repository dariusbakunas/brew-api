import Sequelize from 'sequelize';
import { UserInputError } from 'apollo-server-express';
import atob from 'atob';
import btoa from 'btoa';

/**
 *
 * @param encodedPrevCursor
 * @param encodedNextCursor
 * @param sortDirection
 * @param sortBy
 * @param primaryKeyCol
 * @param limit
 * @param where
 * @link https://github.com/Kaltsoon/sequelize-cursor-pagination/blob/master/src/index.js
 * @returns {{}} Sequelize query with paging support
 */
export const getPagingQuery = (
  encodedPrevCursor, encodedNextCursor, sortBy, sortDirection, primaryKeyCol, limit, where
) => {
  if (limit > 100) {
    throw new UserInputError('Only 100 items can be requested at a time');
  }

  const desc = sortDirection === 'DESCENDING';
  const cursorOrderIsDesc = encodedPrevCursor ? !desc : desc;
  const cursorOrderOp = cursorOrderIsDesc ? Sequelize.Op.lt : Sequelize.Op.gt;

  let cursor;
  let paginationQuery;

  if (encodedPrevCursor) {
    cursor = JSON.parse(atob(encodedPrevCursor));
  }

  if (encodedNextCursor) {
    cursor = JSON.parse(atob(encodedNextCursor));
  }

  if (cursor) {
    if (sortBy !== primaryKeyCol) {
      paginationQuery = {
        [Sequelize.Op.or]: [
          {
            [sortBy]: {
              [cursorOrderOp]: cursor[0],
            },
          },
          {
            [sortBy]: cursor[0],
            [primaryKeyCol]: {
              [cursorOrderOp]: cursor[1],
            },
          },
        ],
      };
    } else {
      paginationQuery = {
        [primaryKeyCol]: {
          [cursorOrderOp]: cursor[0],
        },
      };
    }
  }

  const whereQuery = paginationQuery
    ? { [Sequelize.Op.and]: [paginationQuery, where] }
    : where;

  const order = [
    cursorOrderIsDesc ? [sortBy, 'DESC'] : sortBy,
    ...(sortBy !== primaryKeyCol ? [primaryKeyCol] : []),
  ];

  return {
    // should get one extra item for next cursor if available
    limit: limit + 1,
    order,
    where: whereQuery,
  };
};

const getCursor = (item, sortBy, primaryKeyCol) => {
  let cursor = null;

  if (sortBy !== primaryKeyCol) {
    cursor = [item[sortBy], item[primaryKeyCol]];
  } else {
    cursor = [item[primaryKeyCol]];
  }

  return btoa(JSON.stringify(cursor));
};

export const getPagingCursors = (getNext, getPrev, items, hasMore, sortBy, primaryKeyCol) => {
  const hasNext = getPrev || hasMore;
  const hasPrevious = getNext || (getPrev && hasMore);

  let nextCursor;
  let prevCursor;

  if (hasPrevious) {
    prevCursor = getCursor(items[0], sortBy, primaryKeyCol);
  }

  if (hasNext) {
    nextCursor = getCursor(items[items.length - 1], sortBy, primaryKeyCol);
  }

  return {
    nextCursor,
    prevCursor,
  };
};
