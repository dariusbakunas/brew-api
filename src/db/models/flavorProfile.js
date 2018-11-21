module.exports = (sequelize, DataTypes) => {
  const FlavorProfile = sequelize.define('FlavorProfile', {
    name: DataTypes.STRING,
  }, {
    tableName: 'flavor_profiles',
  });
  FlavorProfile.associate = (models) => {
    // associations can be defined here
  };
  return FlavorProfile;
};
