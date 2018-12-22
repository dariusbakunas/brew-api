import userResolvers from './user';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import MockDate from 'mockdate';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

jest.mock('uuid/v4', () => jest.fn().mockImplementation(() => 'test-uuid-123456'));

const TOKEN = 'abcde123';

describe('Mutation', () => {
  beforeEach(() => {
    uuidv4.mockClear();
    MockDate.set('2018-12-22');
  });

  describe('activateUser', () => {
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

  describe('register', () => {
    it('should throw exception if current user email does not match', async () => {
      let error;

      try {
        await userResolvers.Mutation.register(
          null, { input: { email: 'test@gmail.com' } }, { user: { email: 'user@gmail.com' } },
        );
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new AuthenticationError('Registration email mismatch'));
    });

    it('should throw validation error if invitation code doesn\'t match', async () => {
      const dbMock = {
        Invitation: {
          findOne: jest.fn().mockResolvedValueOnce({ code: '123123' }),
        },
      };

      const dataSources = {
        db: dbMock,
      };

      let error;

      try {
        await userResolvers.Mutation.register(
          null, { input: { email: 'test@gmail.com', code: '321321' } }, { dataSources, user: { email: 'test@gmail.com' } },
        );
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new UserInputError('Invitation code mismatch'));
    });

    it('creates new user with NEW status, sets activation token and token exp and sends activation email', async () => {
      const CODE = '123421';

      process.env.USER_ACTIVATION_TIMEOUT = '86400'; // 24 hours

      const dbMock = {
        Invitation: {
          findOne: jest.fn().mockResolvedValueOnce({ code: CODE }),
        },
        User: {
          create: jest.fn().mockResolvedValueOnce({
            id: 123,
            status: 'NEW',
          }),
        },
      };

      const emailMock = {
        sendActivationEmail: jest.fn().mockResolvedValueOnce(true),
      };

      const input = {
        username: 'testUser',
        email: 'test@gmail.com',
        firstName: 'First',
        lastName: 'Last',
      };

      const dataSources = {
        db: dbMock,
        emailSender: emailMock,
      };

      await userResolvers.Mutation.register(
        null, { input: { ...input, code: CODE } }, { dataSources, user: { email: input.email } },
      );
      expect(dbMock.User.create).toHaveBeenCalledWith({
        ...input,
        activationToken: 'test-uuid-123456',
        activationTokenExp: moment().add(process.env.USER_ACTIVATION_TIMEOUT, 'seconds'),
        status: 'NEW',
      });
    });
  });
});
