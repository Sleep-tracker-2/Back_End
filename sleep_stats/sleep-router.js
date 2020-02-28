const router = require("express").Router();
const Stats = require("./sleep-model.js");

router.get("/:id/sleep", (req, res) => {
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

router.post("/:id/sleep", (req, res) => {
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

module.exports = router;
