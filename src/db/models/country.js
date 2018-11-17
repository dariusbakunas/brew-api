export default (sequelize, DataTypes) => sequelize.define('Country', {
  iso: {
    allowNull: false,
    type: DataTypes.STRING(2),
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(80),
  },
  niceName: {
    allowNull: false,
    type: DataTypes.STRING(80),
  },
  iso3: {
    default: DataTypes.NULL,
    type: DataTypes.STRING(3),
  },
  numCode: {
    default: DataTypes.NULL,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  phoneCode: {
    allowNull: false,
    type: DataTypes.INTEGER.UNSIGNED,
  },
}, {
  timestamps: false,
});
