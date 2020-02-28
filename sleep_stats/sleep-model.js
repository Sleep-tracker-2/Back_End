const db = require("../data/dbConfig.js");

module.exports = {
  getSleep,
  addStats,
  findById
};

function findById(id) {
  return db("sleep")
    .where({ id })
    .first();
}

function getSleep(id) {
  return db("sleep")
    .join("users", "users.id", "sleep.user_id")
    .select(
      "sleep.id",
      "sleep.user_id",
      "sleep.started_sleep",
      "sleep.ended_sleep",
      "sleep.date",
      "sleep.mood",
      "users.username"
    )
    .where({ user_id: id });
}

function addStats(data, id) {
  return db("sleep").insert(data, id);
}
