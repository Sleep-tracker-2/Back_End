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
          mood: 3,
          comment: "my sleep was amazing!"
        },
        {
          id: 2,
          started_sleep: "07:54",
          ended_sleep: "10:25",
          user_id: 2,
          mood: 1,
          comment: "my sleep was terrible!"
        },
        {
          id: 3,
          started_sleep: "12:54",
          ended_sleep: "02:30",
          user_id: 1,
          mood: 2,
          comment: "my sleep was okay!"
        }
      ]);
    });
};
