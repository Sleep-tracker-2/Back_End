exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .string("username", 128)
        .notNullable()
        .unique();
      tbl.string("password", 128).notNullable();
      tbl.timestamp("account_created").defaultTo(knex.fn.now());
      tbl.string("average_sleep");
    })
    .createTable("sleep", tbl => {
      tbl.increments();
      tbl.time("started_sleep").notNullable();
      tbl.time("ended_sleep").notNullable();
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamp("date").defaultTo(knex.fn.now());
      tbl.integer("mood");
      tbl.string("total_sleep");
    })
    .createTable("comments", tbl => {
      tbl.increments();
      tbl.string("comment").notNullable();
      tbl
        .integer("sleep_id")
        .notNullable()
        .unsigned()
        .references("sleep.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("sleep")
    .dropTableIfExists("comments");
};
