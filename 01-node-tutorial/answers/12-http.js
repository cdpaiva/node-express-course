const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to the home page");
  } else if (req.url === "/about") {
    res.end("More about us here");
  } else {
    res.end(`<h1>No route here</h1>
      <p>Get back to the home page</p>
      <a href="/">Return to the home page</a>`);
  }
});

server.listen(5000);
