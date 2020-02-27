const router = require("express").Router();
const Users = require("./user-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ Error: "Failed to access database", err });
    });
});

module.exports = router;
