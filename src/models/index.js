"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const basename = path.basename(__filename);

const config = {
  username: process.env.DB_USERNAME || "user",
  password: process.env.DB_PASSWORD || "pass@123",
  database: process.env.DB_NAME || "acmtest",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // const model = sequelize["import"](path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
      Sequelize
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
