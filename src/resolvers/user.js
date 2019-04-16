import Sequelize from 'sequelize';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import logger from '../logger';
import handleError from './handleError';

const { Op } = Sequelize;

const resolvers = {
  Query: {
    invitations: (_, _args, { dataSources }) => dataSources.db.Invitation.findAll(),
    roles: (_, _args, { dataSources }) => dataSources.db.Role.findAll(),
    user: (_, { id }, { dataSources }) => dataSources.db.User.findByPk(id, {
      include: [{
        model: dataSources.db.Role,
        as: 'roles',
      }],
    }),
    users: (_, _args, { dataSources }) => dataSources.db.User.findAll(),
    userByEmail: (_source, { email }, { dataSources }) => dataSources.db.User.findAll({
      include: [{// Notice `include` takes an ARRAY
        model: dataSources.db.Role,
        as: 'roles',
      }],
      limit: 1,
      where: {
        email: {
          [Op.eq]: email,
        },
      },
      plain: true,
    }),
  },
  Mutation: {
    activateUser: async (_source, { token }, { dataSources }) => {
      const user = await dataSources.db.User.findOne({
        where: {
          activationToken: token,
        },
      });

      if (user && moment(user.activationTokenExp).isAfter(moment())) {
        user.status = 'ACTIVE';
        user.activationTokenExp = null;
        await user.save();
        return { success: true };
      }

      return { success: false };
    },
    createRole: async (_source, { input }, { dataSources }) => dataSources.db.Role.create(input)
      .then(role => dataSources.db.Role.findByPk(role.id))
      .catch((err) => {
        handleError(err);
      }),
    createInvitation: async (_source, { email, sendEmail }, { dataSources }) => {
      const { db, emailSender } = dataSources;

      const code = uuidv4();

      try {
        const result = await db.Invitation.create({
          code,
          email,
        });

        if (sendEmail) {
          try {
            await emailSender.sendInvitationEmail(email, code);
          } catch (err) {
            logger.error(err);
          }
        }

        return result;
      } catch (err) {
        handleError(err);
      }
    },
    updateUser: async (_, { id, input }, { dataSources }) => {
      await dataSources.db.sequelize.transaction(t => dataSources.db.User.update(
        input,
        {
          where: {
            id: {
              [Sequelize.Op.eq]: id,
            },
          },
          transaction: t,
          returning: true,
        },
      ).then(user => user[1][0].setRoles(input.roleIds, { transaction: t })));

      return dataSources.db.User.findByPk(id, {
        include: [{
          model: dataSources.db.Role,
          as: 'roles',
        }],
      });
    },
    removeUser: async (_source, { id }, { dataSources }) => {
      const user = await dataSources.db.User.findByPk(id);

      if (!user) {
        throw new UserInputError('User does not exist');
      }

      await user.destroy();
      return id;
    },
    deleteInvitation: async (_source, { email }, { dataSources }) => {
      const invitation = await dataSources.db.Invitation.findOne({
        where: {
          email,
        },
      });

      if (!invitation) {
        throw new UserInputError(`invitation for ${email} not found`);
      }

      const { id } = invitation;
      await invitation.destroy();
      return id;
    },
    register: async (_source, { input }, { dataSources, user }) => {
      const {
        email, firstName, lastName, username, code,
      } = input;

      if (input.email !== user.email) {
        // can only register your own user
        throw new AuthenticationError('Registration email mismatch');
      }

      // find invitation
      const invitation = await dataSources.db.Invitation.findOne({
        where: {
          email: {
            [Op.eq]: email,
          },
        },
      });

      if (!invitation || invitation.code !== code) {
        throw new UserInputError('Invitation code mismatch', {
          validationErrors: {
            code: 'Invalid code',
          },
        });
      }

      const activationToken = uuidv4();
      const activationTokenExp = moment().add(process.env.USER_ACTIVATION_TIMEOUT, 'seconds');

      try {
        const newUser = await dataSources.db.User.create({
          email,
          firstName,
          lastName,
          username,
          status: 'NEW',
          activationToken,
          activationTokenExp,
        });

        await dataSources.emailSender.sendActivationEmail(email, activationToken);
        await invitation.destroy();
        return newUser;
      } catch (err) {
        handleError(err);
      }
    },
  },
};

export default resolvers;
