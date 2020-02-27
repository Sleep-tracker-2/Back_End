const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  findBy,
  insert
};

function find() {
  return db("users").select(
    "id",
    "username",
    "account_created",
    "average_sleep"
  );
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("users").where(filter);
}

async function insert(data) {
  const [id] = await db("users").insert(data, "id");
  return db("users")
    .where({ id })
    .first();
}
