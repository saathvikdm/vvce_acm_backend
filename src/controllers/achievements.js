const db = require("../models");
const Achievement = db.Achievement;

const getAchievements = async (req, res) => {
  try {
    const achievement = await Achievement.findAll();
    res.status(200).json(achievement);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  return;
};

const getAchievementsById = async (req, res) => {
  const { id } = req.params;
  try {
    const achievement = await Achievement.findOne({ where: id });
    res.status(200).json(achievement);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  return;
};

const createAchievement = async (req, res) => {
  const { title, description, date } = req.body;

  const userID = req.user?.id;

  const achievement = {
    title,
    description,
    date,
    userID,
  };

  try {
    if (!userID) {
      res.status(401);
      return false;
    }
    await Achievement.create(achievement);
    res.status(201).json(achievement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateAchievement = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;
  const userID = req.user?.id;

  const updatedAchievement = {
    title,
    description,
    date,
    userID,
  };

  try {
    if (!(await Achievement.findOne({ where: id })))
      return res.status(404).send(`No achievement found.`);

    await Achievement.update(updatedAchievement, { where: { id } });
    res.json(updatedAchievement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  return;
};

const deleteAchievement = async (req, res) => {
  const { id } = req.body;
  const achievement = await Achievement.findOne({ where: { id } });
  if (!achievement) return res.status(404).send(`No achievement found.`);

  try {
    if (config.access.officer.includes(req.user.accessLevel)) {
      await Achievement.destroy({
        where: { id },
      });
    } else {
      res.status(401);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.json({ message: "Achievement deleted successfully." });
};

module.exports = {
  getAchievements,
  getAchievementsById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
