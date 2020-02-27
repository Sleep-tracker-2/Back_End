const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const UsersRouter = require("./users/user-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", UsersRouter);

server.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = server;
