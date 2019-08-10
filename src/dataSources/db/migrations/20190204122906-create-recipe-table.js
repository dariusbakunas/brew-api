module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("recipes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM,
        values: ["ALL_GRAIN", "EXTRACT", "PARTIAL_MASH", "CIDER", "MEAD", "WINE"],
      },
      batchSize: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable("recipes"),
};
