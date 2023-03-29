var http = require("http");
var fs = require("fs");

http
  .createServer(function (req, res) {
    //const fileStream = fs.createReadStream("non-existing-file.txt", "utf8");
    const fileStream = fs.createReadStream("./content/big.txt", "utf8");
    fileStream.on("open", () => {
      fileStream.pipe(res);
    });
    fileStream.on("error", (err) => {
      res.end(err.message);
    });
  })
  .listen(5000);
