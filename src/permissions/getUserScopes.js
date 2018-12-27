import SCOPES from './scopes';

const getUserScopes = (user) => {
  const scopes = [];

  if (user.isAdmin) {
    return Object.values(SCOPES);
  }

  scopes.push(SCOPES.GET_RANDOM_QUOTE);

  if (user.status === 'GUEST') {
    scopes.push(SCOPES.REGISTER_USER);
  }

  if (user.status === 'ACTIVE') {
    scopes.push(SCOPES.ACTIVE_USER);
  }

  return scopes;
};

export default getUserScopes;
