exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("comments").insert([
        { id: 1, comment: "my sleep last night was amazing!", sleep_id: 5 },
        { id: 2, comment: "my sleep was terrible!", sleep_id: 5 },
        { id: 3, comment: "end my suffering!", sleep_id: 7 }
      ]);
    });
};
