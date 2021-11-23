// Google Auth
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const db = require("../models");
const User = db.User;

// create a new user
const createUser = async (payload) => {
  const { sub, given_name, family_name } = payload;

  const user = await User.findByPk(sub);
  if (!user) {
    await User.create({
      id: sub,
      firstName: given_name,
      lastName: family_name,
    });
  }
  return;
};

const login = (req, res) => {
  let token = req.body.token;

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    // console.log(payload);
    createUser(payload);
  }
  verify()
    .then(() => {
      res.cookie("session-token", token);
      res.send("success");
    })
    .catch(console.error);
};

const logout = (req, res) => {
  res.clearCookie("session-token");
  res.redirect("/login");
};

module.exports = { createUser, login, logout };
