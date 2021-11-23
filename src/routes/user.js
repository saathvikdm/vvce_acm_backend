// Google Auth
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const db = require("../models");
const UserTypes = db.UserType;

const { auth } = require("../middleware/auth");
const { login, logout } = require("../controllers/user");

module.exports = (app) => {
  app.post("/login", login);
  app.get("/logout", logout);

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/profile", auth, (req, res) => {
    let user = req.user;
    res.render("profile", { user });
  });

  app.get("/types", async (req, res) => {
    const exist = await UserTypes.findOne({
      where: { accessLevel: "Manager" },
    });

    if (!exist) {
      await UserTypes.create({ accessLevel: "Manager" });
      await UserTypes.create({ accessLevel: "Officer" });
      await UserTypes.create({ accessLevel: "Member" });
      await UserTypes.create({ accessLevel: "Guest" });
    }

    UserTypes.findAll()
      .then((UserType) => {
        res.json({ UserType });
      })
      .catch((err) => res.status(500).json({ err }));
  });
};
