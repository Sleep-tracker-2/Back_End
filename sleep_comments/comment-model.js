const db = require("../data/dbConfig.js");

module.exports = {
  getComments
};

function getComments(id) {
  return db("comments")
    .join("sleep", "sleep.id", "comments.sleep_id")
    .select(
      "comments.id as comment_id",
      "comments.sleep_id",
      "comments.comment",
      "sleep.date"
    )
    .where({ sleep_id: id });
}
