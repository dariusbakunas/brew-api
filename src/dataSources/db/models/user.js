module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define(
    "UserRoles",
    {},
    {
      timestamps: false,
      tableName: "user_roles",
    }
  );

  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          len: [3, 255],
        },
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [5, 32],
            msg: "Username length must be between 5 and 32",
          },
        },
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ["NEW", "ACTIVE", "INACTIVE"],
        defaultValue: "NEW",
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      activationToken: DataTypes.STRING,
      activationTokenExp: DataTypes.DATE,
    },
    {
      tableName: "users",
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      as: "roles",
      through: UserRoles,
      foreignKey: "userId",
      otherKey: "roleId",
    });
  };

  return User;
};
