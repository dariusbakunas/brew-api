const roles = require('../../permissions/roles');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('roles',
    Object.keys(roles).map(code => ({
      code,
      name: roles[code],
    }))),

  down: queryInterface => queryInterface.bulkDelete('roles', null, {}),
};
