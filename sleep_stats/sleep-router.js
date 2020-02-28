const router = require("express").Router();
const Stats = require("./sleep-model.js");
const tokenAuth = require("../auth/token-middleware.js");
const sessionAuth = require("../auth/session-middleware.js");

router.get("/:id/sleep", tokenAuth, sessionAuth, (req, res) => {
  Stats.getSleep(req.params.id)
    .then(stat => {
      if (stat.length) {
        res.status(200).json(stat);
      } else {
        res.status(404).json({ message: "that ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "failed to retrieve data" });
    });
});

router.post("/:id/sleep", tokenAuth, sessionAuth, (req, res) => {
  console.log(req.params.id, req.body);
  const { id } = req.params;
  const data = req.body;
  data.user_id = id;
  console.log("data", data);
  Stats.findById(id)
    .then(user => {
      if (user) {
        Stats.addStats(data, id)
          .then(added => {
            res.status(200).json(added);
          })
          .catch(err => {
            res.status(500).json(err.message);
          });
      } else {
        return res.status(400).json({ message: "ID does not exist" });
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
