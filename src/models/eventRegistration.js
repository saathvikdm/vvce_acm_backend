module.exports = (sequelize, DataTypes, Sequelize) => {
  const EventRegistration = sequelize.define("EventRegistration", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  });

  EventRegistration.associate = function (models) {
    EventRegistration.belongsTo(models.User, {
      foreignKey: {
        name: "userID",
        allowNull: false,
      },
    });

    EventRegistration.belongsTo(models.Event, {
      foreignKey: {
        name: "eventID",
        allowNull: false,
      },
    });
  };

  return EventRegistration;
};
