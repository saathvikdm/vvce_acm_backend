const db = require("../models");
const Event = db.Event;

const getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findOne({ where: { id } });
    if (!event) {
      res.status(404).send(`No Event with id: ${id}`);
      return false;
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  return;
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  return;
};

const createEvent = async (req, res) => {
  const { title, description, eventDate, endDate } = req.body;
  const userID = req.user?.id;
  console.log(userID);

  const event = {
    title,
    description,
    eventDate,
    endDate,
    userID,
  };

  try {
    await Event.create(event);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, eventDate, endDate } = req.body;
  const userID = req.user?.id;

  const updatedEvent = {
    title,
    description,
    eventDate,
    endDate,
    updatedBy: userID,
  };

  try {
    if (!(await Event.findOne({ where: { id } })))
      return res.status(404).send(`No Event with id: ${id}`);

    await Event.update(updatedEvent, { where: { id } });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  return;
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!(await Event.findOne({ where: { id } })))
    return res.status(404).send(`No Event with id: ${id}`);

  await Event.destroy({
    where: { id },
  });

  res.json({ message: "Event deleted successfully." });
};

module.exports = {
  getAllEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
};
