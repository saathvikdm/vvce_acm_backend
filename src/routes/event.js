const { allowOnly } = require("../middleware/allowOnly");
const { auth } = require("../middleware/auth");
const config = require("../config/userRoles");

const {
  getAllEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");

module.exports = (app) => {
  app.get("/events", auth, getAllEvents);
  app.get("/events/:id", auth, getEvent);
  app.post("/events", auth, allowOnly(config.access.member), createEvent);
  app.patch("/events/:id", auth, allowOnly(config.access.member), updateEvent);
  app.delete("/events/:id", auth, allowOnly(config.access.member), deleteEvent);
};
