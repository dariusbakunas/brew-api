module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("recipe_fermentables", {
      recipeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "recipes",
          key: "id",
        },
      },
      fermentableId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "fermentables",
          key: "id",
        },
      },
      unit: {
        type: Sequelize.ENUM,
        values: ["LB", "OZ"],
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable("recipe_fermentables"),
};
