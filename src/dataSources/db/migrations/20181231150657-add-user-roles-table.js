module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable("user_roles", {
        roleId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "roles",
            key: "id",
          },
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
      })
      .then(() =>
        queryInterface.addConstraint("user_roles", ["roleId", "userId"], {
          type: "unique",
          name: "user_roles_unique_constraint",
        })
      ),

  down: (queryInterface) => queryInterface.dropTable("user_roles"),
};
