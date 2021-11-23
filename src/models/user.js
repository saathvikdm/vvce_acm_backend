module.exports = (sequelize, DataTypes, Sequelize) => {
  const User = sequelize.define("User", {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    accessLevel: {
      type: DataTypes.STRING,
      defaultValue: "Guest",
    },
  });

  //   User.associate = function (models) {
  //     User.belongsTo(models.UserTypes, {
  //       foreignKey: "accessLevel",
  //     });
  //   };

  return User;
};
