import userResolvers from './user';
import uuidv4 from 'uuid/v4';
import MockDate from 'mockdate';

jest.mock('uuid/v4', () => jest.fn().mockImplementation(() => 'test-uuid-123456'));

const TOKEN = 'abcde123';

describe('Mutation', () => {
  beforeEach(() => {
    uuidv4.mockClear();
    MockDate.set('2018-12-22');
  });

  it('sets user status to active if token matches and is not yet expired', async () => {
    const USER = {
      activationToken: TOKEN,
      activationTokenExp: '2018-12-23',
      status: 'NEW',
      save: jest.fn().mockResolvedValueOnce(true),
    };

    const dbMock = {
      User: {
        findOne: jest.fn().mockResolvedValueOnce(USER),
      },
    };

    const dataSources = {
      db: dbMock,
    };

    const result = await userResolvers.Mutation.activateUser(
      null, { token: TOKEN }, { dataSources },
    );
    expect(dbMock.User.findOne).toHaveBeenCalledTimes(1);
    expect(USER).toEqual({
      ...USER,
      status: 'ACTIVE',
      activationTokenExp: null,
    });
    expect(USER.save).toHaveBeenCalledTimes(1);

    expect(result).toEqual({ success: true });
  });

  it('should return success: false if token did not match', async () => {
    const dbMock = {
      User: {
        findOne: jest.fn().mockResolvedValueOnce(null),
      },
    };

    const dataSources = {
      db: dbMock,
    };

    const result = await userResolvers.Mutation.activateUser(
      null, { token: TOKEN }, { dataSources },
    );

    expect(result).toEqual({ success: false });
  });

  it('should return success: false if token is expired', async () => {
    const USER = {
      activationToken: TOKEN,
      activationTokenExp: '2018-12-21',
      status: 'NEW',
      save: jest.fn().mockResolvedValueOnce(true),
    };

    const dbMock = {
      User: {
        findOne: jest.fn().mockResolvedValueOnce(USER),
      },
    };

    const dataSources = {
      db: dbMock,
    };

    const result = await userResolvers.Mutation.activateUser(
      null, { token: TOKEN }, { dataSources },
    );

    expect(result).toEqual({ success: false });
  });
});
