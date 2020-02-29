exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "test_user",
          password: "password",
          average_sleep: "7hr, 30min"
        },
        {
          id: 2,
          username: "test_user_two",
          password: "passwordTwo",
          average_sleep: "3hr"
        }
      ]);
    });
};
