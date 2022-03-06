const { allowOnly } = require("../middleware/allowOnly");
const { auth } = require("../middleware/auth");
const config = require("../config/userRoles");

const {
  createRegistration,
  getEventRegistrations,
  getAllRegistrations,
  deleteRegistration,
} = require("../controllers/eventRegistration");

module.exports = (app) => {
  app.get("/eventregister", auth, getAllRegistrations);
  app.get("/eventregister/:id", auth, getEventRegistrations);
  app.post(
    "/eventregister",
    auth,
    allowOnly(config.access.member),
    createRegistration
  );
  app.delete(
    "/eventregister",
    auth,
    allowOnly(config.access.member),
    deleteRegistration
  );
};
