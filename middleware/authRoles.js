const setAdmin = (req, res, next) => {
  if (req.user.role === "ADMIN" || req.user.role === null) {
    next();
  } else {
    res.status(403).json("You are not authorized to this route");
  }
};
const setSUPER_ADMIN = (req, res, next) => {
  if (req.user.role === "SUPER-ADMIN" || req.user.role === null) {
    next();
  } else {
    res.status(403).json("You are not authorized to this route");
  }
};

module.exports = { setAdmin, setSUPER_ADMIN };
