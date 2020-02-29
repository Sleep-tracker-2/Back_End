require("dotenv").config();
const server = require("./server.js");
const port = process.env.PORT;

server.listen(PORT, () => {
  console.log(`server listening on port ${port}`);
});
