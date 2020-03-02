const router = require("express").Router();
const Stats = require("./sleep-model.js");
const tokenAuth = require("../auth/token-middleware.js");
const sessionAuth = require("../auth/session-middleware.js");

router.get("/:id/sleep", (req, res) => {
  console.log(req.query);
  Stats.getSleep(req.params.id)
    .then(stat => {
      if (stat.length) {
        res.status(200).json(stat);
      } else {
        res
          .status(404)
          .json({ message: "this user does not have sleep records" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "failed to retrieve data" });
    });
});

router.post("/:id/sleep", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  data.user_id = id;
  Stats.findById(id)
    .then(user => {
      if (user) {
        Stats.addStats(data, id)
          .then(added => {
            res.status(200).json(added);
          })
          .catch(err => {
            res.status(500).json({ Error: "this isnt working", err });
          });
      } else {
        return res.status(400).json({ message: "that ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

//TODO
// router.delete("/:id/sleep", (req, res) => {
//   Stats.delStat(req.params.id)
//     .then(deleted => {
//       if (deleted) {
//         res.status(201).json(deleted);
//       } else {
//         res.status(400).json({ message: "inavlid ID" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

module.exports = router;
