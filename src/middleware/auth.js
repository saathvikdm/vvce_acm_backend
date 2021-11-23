require("dotenv").config();

// Google Auth
const { OAuth2Client } = require("google-auth-library");
const { getAccessLevel } = require("../controllers/user");
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const db = require("../models");
const User = db.User;

const auth = (req, res, next) => {
  let token = req.cookies["session-token"];

  let user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    user.name = payload.name;
    user.email = payload.email;
    user.picture = payload.picture;
    user.id = payload.sub;

    const userObj = await User.findByPk(user.id);
    user.accessLevel = userObj.dataValues.accessLevel;
  }

  verify()
    .then(() => {
      req.user = user;
      next();
    })
    .catch((err) => {
      // res.redirect("/login");
      res.status(401).send("Unauthorized");
    });
};

module.exports = { auth };
