const server = require("./server.js");
require("dotenv").config();
const port = process.env.PORT;

server.listen(PORT, () => {
  console.log(`server listening on port ${port}`);
});
