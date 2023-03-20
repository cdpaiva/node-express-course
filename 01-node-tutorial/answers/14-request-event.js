const http = require("http");

//builtin modules also use events
const server = http.createServer();
server.on("request", (req, res) => {
  res.end("Welcome");
});

server.listen(5000);
