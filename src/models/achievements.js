module.exports = (sequelize, DataTypes, Sequelize) => {
  const Achievement = sequelize.define("Achievement", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  });

  Achievement.associate = function (models) {
    Achievement.belongsTo(models.User, {
      foreignKey: {
        name: "userID",
        allowNull: false,
      },
    });
  };

  return Achievement;
};
