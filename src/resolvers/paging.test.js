import { UserInputError } from 'apollo-server-express';
import Sequelize from 'sequelize';
import { getPagingQuery, getPagingCursors } from './paging';

describe('paging', () => {
  describe('getPagingQuery', () => {
    it('should return valid query if no cursor provided', () => {
      const query = getPagingQuery(
        null,
        null,
        'name',
        'ASCENDING',
        'id',
        20,
        {},
      );
      expect(query).toEqual({
        limit: 21,
        order: [
          'name',
          'id',
        ],
        where: {},
      });
    });

    it('should include where clause if cursor is specified', () => {
      const testCursor = 'WyJBcG9sb24iLDQ0XQ==';
      const query = getPagingQuery(
        null,
        testCursor,
        'name',
        'ACENDING',
        'id',
        20,
        {},
      );
      expect(query).toEqual({
        limit: 21,
        order: [
          'name',
          'id',
        ],
        where: {
          [Sequelize.Op.and]: [
            {
              [Sequelize.Op.or]: [
                { name: { [Sequelize.Op.gt]: 'Apolon' } },
                {
                  id: { [Sequelize.Op.gt]: 44 },
                  name: 'Apolon',
                },
              ],
            },
            {},
          ],
        },
      });
    });

    it('should throw user error if requested limit is too high', () => {
      let error;

      try {
        getPagingQuery(
          null,
          null,
          'name',
          'ASCENDING',
          'id',
          110,
          {},
        );
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UserInputError('Only 100 items can be requested at a time'));
    });
  });

  describe('getCursor', () => {
    it('should return encoded cursors', () => {
      const { nextCursor, prevCursor } = getPagingCursors(
        true,
        false,
        [{ name: 'a', id: 1 }, { name: 'b', id: 2 }, { name: 'c', id: 3 }],
        true,
        'name',
        'id',
      );

      expect(nextCursor).toEqual('WyJjIiwzXQ=='); // ['c', 3]
      expect(prevCursor).toEqual('WyJhIiwxXQ=='); // ['a', 1]
    });
  });
});
