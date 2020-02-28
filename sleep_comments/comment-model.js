const db = require("../data/dbConfig.js");

module.exports = {
  getComments,
  findById,
  addComment
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

function findById(id) {
  return db("comments")
    .where({ id })
    .first();
}

async function addComment(data, id) {
  await db("comments").insert(data, id);
}

//TODO edit
//TODO delete
