const db = require("../models");

const config = require("../config/userRoles");

const Event = db.Event;
const EventRegistration = db.EventRegistration;

const createRegistration = async (req, res) => {
  const { eventID } = req.body;
  const userID = req.user?.id;

  const eventRegistration = {
    eventID,
    userID,
  };

  try {
    if (!userID) {
      res.status(401);
      return false;
    }
    const event = await Event.findOne({ where: eventID });
    if (!event) {
      res.status(404).send(`No Event with id: ${eventID}`);
      return false;
    }
    await EventRegistration.create(eventRegistration);
    res.status(201).json(eventRegistration);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  return;
};

const getEventRegistrations = async (req, res) => {
  const { id } = req.params;

  try {
    const registrations = await EventRegistration.findAll({
      where: { eventID: id },
    });
    if (!registrations) {
      res.status(404).send(`No registrations for event with id: ${id}`);
      return false;
    }
    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await EventRegistration.findAll();
    res.status(200).json(registrations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  return;
};

const deleteRegistration = async (req, res) => {
  const { id } = req.body;
  const userID = req.user?.id;

  const eventRegistration = await EventRegistration.findOne({ where: { id } });
  if (!eventRegistration)
    return res.status(404).send(`No Event with id: ${id}`);

  try {
    if (
      config.access.officer.includes(req.user.accessLevel) ||
      eventRegistration.userID === userID
    ) {
      await EventRegistration.destroy({
        where: { id },
      });
    } else {
      res.status(401);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.json({ message: "Event Registration deleted successfully." });
};

module.exports = {
  createRegistration,
  getEventRegistrations,
  getAllRegistrations,
  deleteRegistration,
};
