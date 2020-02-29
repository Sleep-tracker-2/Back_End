require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const knexSessionStore = require("connect-session-knex")(session);

const UsersRouter = require("./users/user-router");
const SleepRouter = require("./sleep_stats/sleep-router");
const CommentRouter = require("./sleep_comments/comment-router");

const server = express();

const sessionConfig = {
  name: "sleepTrackerSession",
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require("./data/dbConfig.js"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60 * 24
  })
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/users", UsersRouter);
server.use("/api/users", SleepRouter);
server.use("/api/sleep", CommentRouter);

server.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = server;
