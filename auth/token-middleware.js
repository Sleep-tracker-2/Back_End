require("dotenv").config();
const jwt = require("jsonwebtoken");

function tokenAuth(req, res, next) {
  const token = req.headers.authorization;
  if (req.decodedJwt && req.session && req.session.loggedIn === true) {
    next();
  } else if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedJwt) => {
      if (err) {
        res.status(401).json({ message: "you do not have authorization" });
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "you do not have authorization" });
  }
}

module.exports = tokenAuth;
