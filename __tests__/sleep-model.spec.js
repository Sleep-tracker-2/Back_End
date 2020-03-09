const model = require("../sleep_stats/sleep-model");
const users = require("../users/user-model");
const db = require("../data/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});

describe("models", () => {
  it("should insert correctly", async () => {});
  //   it("should find by ID", async () => {
  //     await model.addStats({
  //       started_sleep: "07:54",
  //       ended_sleep: "12:30",
  //       user_id: 1
  //     });
  //     const stats = await db("sleep");
  //     await model.findById({ id: 1 });
  //     console.log("model", stats);
  //     expect(stats).toHaveLength(1);
  //   });
  //   it("should contain what was inserted", async () => {
  //     await model.insert({ username: "CodyHayes", password: "password1" });
  //     const users = await db("sleep");
  //     expect(users).toEqual([
  //       expect.objectContaining({
  //         username: "CodyHayes"
  //       })
  //     ]);
  //   });
  // it("deletes properly", async () => {
  //   await model.insert({ username: "CodyHayes", password: "password1" });
  //   await model.remove({ id: 1 });
  //   const users = await db("users");
  //   expect(users).toHaveLength(0);
  // });
  // it("updates properly", async () => {
  //   const users = await db("users");
  //   await model.insert({ username: "CodyHayes", password: "password1" });
  //   await model.findById({ id: 1 });
  //   await model.update({
  //     username: "Updated",
  //     password: "updatedpassword"
  //   });
  //   expect(users).toEqual([
  //     expect.objectContaining({
  //       username: "Updated"
  //     })
  //   ]);
  // });
});
