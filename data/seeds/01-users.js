exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users").then(function() {
    // Inserts seed entries
    return knex("users").insert([
      {
        username: "test_user",
        password: "password",
        average_sleep: "7hr, 30min"
      },
      {
        username: "test_user_two",
        password: "passwordTwo",
        average_sleep: "3hr"
      }
    ]);
  });
};
