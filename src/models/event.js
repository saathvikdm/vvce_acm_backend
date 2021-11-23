module.exports = (sequelize, DataTypes, Sequelize) => {
  const Event = sequelize.define("Event", {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    eventDate: {
      type: DataTypes.DATE,
      // allowNull defaults to true
    },
    endDate: {
      type: DataTypes.DATE,
      // allowNull defaults to true
    },
  });

  Event.associate = function (models) {
    Event.belongsTo(models.User, {
      foreignKey: {
        name: "userID",
        allowNull: false,
      },
    });

    Event.belongsTo(models.User, {
      foreignKey: {
        name: "updatedBy",
        allowNull: true,
      },
    });
  };

  return Event;
};
