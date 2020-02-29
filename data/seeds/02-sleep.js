exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("sleep")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("sleep").insert([
        {
          id: 1,
          started_sleep: "07:54",
          ended_sleep: "12:30",
          user_id: 1,
          date: Date.now(),
          mood: 3
        },
        {
          id: 2,
          started_sleep: "07:54",
          ended_sleep: "10:25",
          user_id: 2,
          date: Date.now(),
          mood: 1
        },
        {
          id: 3,
          started_sleep: "12:54",
          ended_sleep: "02:30",
          user_id: 1,
          date: Date.now(),
          mood: 2
        }
      ]);
    });
};
