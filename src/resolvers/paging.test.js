import { UserInputError } from 'apollo-server-express';
import Sequelize from 'sequelize';
import { getPagedQuery, getNextCursor } from './paging';

describe('paging', () => {
  describe('getPagingQuery', () => {
    it('should return valid query if no cursor provided', () => {
      const query = getPagedQuery(null, 20, 'name', 'ASCENDING');
      expect(query).toEqual({
        limit: 21,
        order: [
          ['name', 'ASC'],
          ['id', 'ASC'],
        ],
        where: {},
      });
    });

    it('should include where clause if cursor is specified', () => {
      const testCursor = 'WyJBcG9sb24iLDQ0XQ==';
      const query = getPagedQuery(testCursor, 20, 'name', 'ASCENDING');
      expect(query).toEqual({
        limit: 21,
        order: [
          ['name', 'ASC'],
          ['id', 'ASC'],
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
        getPagedQuery(null, 110, 'name', 'ASCENDING');
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UserInputError('Only 100 items can be requested at a time'));
    });
  });

  describe('getNextCursor', () => {
    it('should return encoded cursor', () => {
      const cursor = getNextCursor({ id: 44, name: 'Apolon' }, 'name');
      expect(cursor).toEqual('WyJBcG9sb24iLDQ0XQ==');
    });
  });
});
