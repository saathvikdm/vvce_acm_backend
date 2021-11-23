module.exports = (sequelize, DataTypes, Sequelize) => {
  const UserTypes = sequelize.define("UserType", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    accessLevel: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  UserTypes.associate = function (models) {
    UserTypes.hasMany(models.User, {
      foreignKey: "accessLevel",
    });
  };
  return UserTypes;
};
