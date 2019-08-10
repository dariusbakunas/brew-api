module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable("yeast", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        labId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "yeast_labs",
            key: "id",
          },
        },
        form: {
          allowNull: false,
          type: Sequelize.ENUM,
          values: ["LIQUID", "DRY"],
        },
        type: {
          allowNull: false,
          type: Sequelize.ENUM,
          values: ["ALE", "CHAMPAGNE", "LAGER", "WHEAT", "WINE"],
        },
        description: Sequelize.TEXT,
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint("yeast", ["name", "labId"], {
          type: "unique",
          name: "yeast_unique_contraint",
        })
      ),
  down: (queryInterface) => queryInterface.dropTable("yeast"),
};
