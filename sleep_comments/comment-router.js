const router = require("express").Router();
const Comments = require("./comment-model.js");
const tokenAuth = require("../auth/token-middleware.js");
const sessionAuth = require("../auth/session-middleware.js");

router.get("/:id/comments", (req, res) => {
  Comments.getComments(req.params.id)
    .then(comm => {
      if (comm) {
        res.status(200).json(comm);
      } else {
        res.tatus(404).json({ message: "that sleep ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "failed to retrieve data" });
    });
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;

  req.body.sleep_id = id;

  Comments.findById(id)
    .then(comm => {
      if (comm) {
        Comments.addComment(req.body, id)
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

//TODO edit
//TODO delete

module.exports = router;
