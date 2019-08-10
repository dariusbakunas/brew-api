module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("water", {
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
      pH: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      alkalinity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      calcium: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      magnesium: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      sodium: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      sulfate: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      chloride: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      bicarbonate: {
        allowNull: false,
        type: Sequelize.FLOAT,
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
    }),

  down: (queryInterface) => queryInterface.dropTable("water"),
};
