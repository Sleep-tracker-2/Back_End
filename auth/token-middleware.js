require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = require("../config/secrets.js");

function tokenAuth(req, res, next) {
  const token = req.headers.authorization;
  if (req.decodedJwt) {
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
