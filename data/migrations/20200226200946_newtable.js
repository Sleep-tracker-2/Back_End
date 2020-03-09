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
      tbl.increments("sleep_id");
      tbl.time("started_sleep").notNullable();
      tbl.time("ended_sleep").notNullable();
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.date("date");
      tbl.integer("mood");
      tbl.string("total_sleep");
      tbl.string("comment");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sleep").dropTableIfExists("users");
};
