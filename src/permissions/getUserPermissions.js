import PERMISSIONS from './permissions';

const getUserPermissions = (user) => {
  const permissions = [];

  if (user.isAdmin) {
    return Object.values(PERMISSIONS);
  }

  permissions.push(PERMISSIONS.GET_RANDOM_QUOTE);

  if (user.status === 'GUEST') {
    permissions.push(PERMISSIONS.REGISTER_USER);
  }

  if (user.status === 'ACTIVE') {
    permissions.push(PERMISSIONS.ACTIVE_USER);
  }

  return permissions;
};

export default getUserPermissions;
