const { allowOnly } = require("../middleware/allowOnly");
const { auth } = require("../middleware/auth");
const config = require("../config/userRoles");

const {
  getAchievements,
  getAchievementsById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievements");

module.exports = (app) => {
  app.get("/achievements", getAchievements);
  app.get("/achievements/:id", auth, getAchievementsById);
  app.post(
    "/achievements",
    auth,
    allowOnly(config.access.officer),
    createAchievement
  );
  app.patch(
    "/achievements/:id",
    auth,
    allowOnly(config.access.officer),
    updateAchievement
  );
  app.delete(
    "/achievements/:id",
    auth,
    allowOnly(config.access.officer),
    deleteAchievement
  );
};
