module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable("fermentables", {
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
        category: {
          allowNull: false,
          type: Sequelize.ENUM,
          values: ["DRY_EXTRACT", "FRUIT", "JUICE", "GRAIN", "LIQUID_EXTRACT", "SUGAR"],
        },
        description: Sequelize.TEXT,
        type: {
          type: Sequelize.ENUM,
          values: ["BASE", "COLOR", "CARAMEL_CRYSTAL", "ROASTED", "ADJUNCT", "SPECIALTY"],
        },
        color: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
        originId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "countries",
            key: "id",
          },
        },
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
        queryInterface.addConstraint("fermentables", ["name", "originId"], {
          type: "unique",
          name: "fermentables_unique_contraint",
        })
      ),

  down: (queryInterface) => queryInterface.dropTable("fermentables"),
};
