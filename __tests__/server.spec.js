const server = require("../server.js");
const supertest = require("supertest");
const request = supertest(server);

describe("sample test and GET", () => {
  it("should return true", () => {
    expect(true).toBe(true);
  });
  it("gets the test endpoint", async done => {
    const response = await request.get("/api/users");

    expect(response.status).toBe(200);
    // expect(response.body.message).toBe('pass!')
    done();
  });
  it("returns JSON", async done => {
    const response = await request.get("/api/users");
    // console.log("USERS", response.body);
    expect(response.type).toEqual("application/json");
    // expect(response.body.message).toBe('pass!')
    done();
  });
});

describe("auth and token", () => {
  it("should require authorization", done => {
    request
      .get("/api/users/1/sleep")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  var auth = {};
  beforeAll(loginUser(auth));

  function loginUser(auth) {
    return function(done) {
      request
        .post("/api/users/login")
        .send({
          username: "test_user_two",
          password: "passwordTwo"
        })
        .expect(200)
        .end(onResponse);

      function onResponse(err, res) {
        auth.token = res.body.token;

        return done();
      }
    };
  }
  it("should request sleep users and respond with 200", () => {
    request
      .get("/api/users/2/sleep")
      .set("Authorization", +auth.token)
      .expect(200);
  });

  it("returns an array", async () => {
    const response = await request
      .get("/api/users/2/sleep")
      .set("Authorization", +auth.token);
    expect(response).toEqual(expect.any(Object));
  });
  it("registers to database", () => {
    request
      .post("/api/users/register")
      .send({ username: "newUser", password: "pass" })
      .expect(201);
  });
  it("returns json", () => {
    console.log(request.put);
    request
      .post("/api/users/register")
      .send({ username: "newUser", password: "pass" })

      .expect("Content-Type", /json/);
  });
  it("deletes properly", () => {
    request
      .delete("api/users/1")
      .set("Authorization", +auth.token)
      .expect(204);
    // .send({username: "newUser", password: "pass"})
  });
  it("doesnt delete without auth", () => {
    request.delete("api/users/1").expect(401);
    // .send({username: "newUser", password: "pass"})
  });
  it("doesnt update without auth", () => {
    request.delete("api/users/1").expect(401);
    // .send({username: "newUser", password: "pass"})
  });
  it("updates properly", () => {
    request
      .put("api/users/1")
      .send({ username: "newestUser", password: "pass" })
      .set("Authorization", +auth.token)
      .expect(204);
    // .send({username: "newUser", password: "pass"})
  });
  it("posts a new sleep record", () => {
    request
      .post("/api/users/1/sleep")
      .send({
        started_sleep: "20:04:00",
        ended_sleep: "20:45:00",
        comment: "works!"
      })
      .set("Authorization", +auth.token)
      .expect();
  });
});
