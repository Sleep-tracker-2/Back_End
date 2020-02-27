function sessionAuth(req, res, next) {
  if (req.session.loggedIn && req.session.loggedIn === true) {
    next();
  } else {
    res.status(400).json({ message: "you do not have authorization" });
  }
}

module.exports = sessionAuth;
