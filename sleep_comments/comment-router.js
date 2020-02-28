const router = require("express").Router();
const Comments = require("./comment-model.js");

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

module.exports = router;
