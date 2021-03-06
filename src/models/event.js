module.exports = (sequelize, DataTypes, Sequelize) => {
  const Event = sequelize.define("Event", {
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
    eventDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
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
