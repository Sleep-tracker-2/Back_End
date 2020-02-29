exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("sleep")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("sleep").insert([
        {
          id: 1,
          started_sleep: 075400,
          ended_sleep: 123000,
          user_id: 1,
          date: Date.now(),
          mood: 3
        },
        {
          id: 2,
          started_sleep: 075400,
          ended_sleep: 102500,
          user_id: 2,
          date: Date.now(),
          mood: 1
        },
        {
          id: 3,
          started_sleep: 125400,
          ended_sleep: 023000,
          user_id: 1,
          date: Date.now(),
          mood: 2
        }
      ]);
    });
};
