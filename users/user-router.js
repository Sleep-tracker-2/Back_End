require("dotenv").config();
const router = require("express").Router();
const Users = require("./user-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/secrets.js");
const tokenAuth = require("../auth/token-middleware.js");
// const sessionAuth = require("../auth/session-middleware.js");

// router.get("/logout", tokenAuth, (req, res) => {
//   if (req.session) {
//     req.session.destroy(err => {
//       if (err) {
//         res.send("session not destroyed");
//       } else {
//         res.send("logged out see you soon!");
//       }
//     });
//   } else {
//     res.end();
//   }
// });

router.get("/", (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ Error: "Failed to access database", err });
    });
});

router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ Error: "Failed to access database", err });
    });
});

router.post("/register", (req, res) => {
  let userData = req.body;
  const hash = bcrypt.hashSync(userData.password, 12);
  userData.password = hash;
  Users.insert(userData)
    .then(user => {
      res.status(201).json({
        message: `Thanks for registering, ${userData.username}!`,
        user
      });
    })
    .catch(err => {
      res.status(500).json({ Error: "failed to retrieve database", err });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // req.session.loggedIn = true;
        const token = genToken(user);
        // console.log(req.session, token);
        res
          .status(200)
          .json({ message: `Welcome back, ${username}`, user, token });
      } else {
        res.status(401).json({ message: "invalid username/password" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "failed to retrieve database", err });
    });
});

router.delete("/:id", tokenAuth, (req, res) => {
  Users.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(204).json({ message: "successfully deleted user" });
      } else {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "failed to retrieve database", err });
    });
});

router.put("/:id", tokenAuth, (req, res) => {
  const { id } = req.params;
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  password = hash;
  if (!username || !password) {
    res.status(400).json({
      success: false,
      errorMessage: "Please provide name and bio for the user."
    });
  }
  Users.update(id, { username, password })
    .then(updated => {
      if (updated) {
        const token = genToken(updated);
        res.status(204).json({ message: `updated user ${username}`, token });
      } else {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "failed to retrieve database", err });
    });
});

function genToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "12h"
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

module.exports = router;
