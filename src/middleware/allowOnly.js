const allowOnly = function (access) {
  return (req, res, next) => {
    const { user } = req;

    if (user && access.includes(user.accessLevel)) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports = { allowOnly };
