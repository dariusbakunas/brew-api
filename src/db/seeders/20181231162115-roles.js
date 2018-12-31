const roles = require('../../permissions/roles');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('roles',
    Object.values(roles).map(role => ({
      name: role,
    }))),

  down: queryInterface => queryInterface.bulkDelete('roles', null, {}),
};
