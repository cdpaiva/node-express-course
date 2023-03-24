/*
  The files used in index.html must be sent by the server
  We load them all in memory and sent them to the browser whenever requested to
  Express is not doing any extra work to find the files, so we must point them one by one
*/

import http from "http";
import { readFileSync } from "fs";

// get all files
// files are loaded just once, before the server starts
const homePage = readFileSync("./navbar-app/index.html");
const homeStyles = readFileSync("./navbar-app/styles.css");
const homeImage = readFileSync("./navbar-app/logo.svg");
const homeLogic = readFileSync("./navbar-app/browser-app.js");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h2>ABOUT PAGE</h2>");
    res.end();
  }
  // hardcode all the paths that we referenced in the index.html file
  // each file is shipped with its correspondent content-type
  else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
    res.end();
  } else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(homeImage);
    res.end();
  } else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeLogic);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h2>Page not found</h2>");
    res.end();
  }
});

server.listen(5000);
