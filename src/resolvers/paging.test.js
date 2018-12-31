import { getPagedQuery, getNextCursor } from './paging';
import { UserInputError } from 'apollo-server-express';
import Sequelize from 'sequelize';

describe('paging', () => {
  describe('getPagingQuery', () => {
    it('should return valid query if no cursor provided', () => {
      const query = getPagedQuery(null, 20, 'name', 'ASCENDING');
      expect(query).toEqual({
        limit: 20,
        order: [
          ['name', 'ASC'],
          ['id', 'ASC'],
        ],
      });
    });

    it('should include where clause if cursor is specified', () => {
      const testCursor = 'W3sia2V5IjoibmFtZSIsInZhbHVlIjoiQXBvbG9uIn0seyJrZXkiOiJpZCIsInZhbHVlIjo0NH1d';
      const query = getPagedQuery(testCursor, 20, 'name', 'ASCENDING');
      expect(query).toEqual({
        limit: 20,
        order: [
          ['name', 'ASC'],
          ['id', 'ASC'],
        ],
        where: {
          id: {
            [Sequelize.Op.gte]: 44,
          },
          name: {
            [Sequelize.Op.gte]: 'Apolon',
          },
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
      expect(cursor).toEqual('W3sia2V5IjoibmFtZSIsInZhbHVlIjoiQXBvbG9uIn0seyJrZXkiOiJpZCIsInZhbHVlIjo0NH1d');
    });
  });
});
