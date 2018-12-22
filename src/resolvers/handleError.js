import { ApolloError, UserInputError } from 'apollo-server-express';
import logger from '../logger';

function handleError(err) {
  if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
    throw new UserInputError('Please check your inputs', {
      validationErrors: err.errors.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {}),
    });
  } else {
    logger.error(err);
    throw new ApolloError(err.message);
  }
}

export default handleError;
