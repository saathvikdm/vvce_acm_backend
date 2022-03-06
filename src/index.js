const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { Sequelize, DataTypes } = require("sequelize");

const models = require("./models");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

require("./routes/user.js")(app);
require("./routes/event.js")(app);
require("./routes/eventRegistration.js")(app);
require("./routes/achievements.js")(app);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

// force: true will drop the table if it already exits
// models.sequelize.sync({ force: true }).then(() => {
models.sequelize.sync().then(() => {
  console.log("Drop and Resync with {force: true}");
});

const server = app.listen(port, async () => {
  console.log(`Server listening at http://localhost:${port}`);
  try {
    await models.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
