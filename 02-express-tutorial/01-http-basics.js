/*
  Creates an http server that sends responses to two endpoints: '/' and '/about'
  All other routes are answered with 'Page not found'

  The content-type indicates the type of the resource being sent.
  Found something interesting about content-type: IE used to ignore the content-type header
  and try to infer the media type by analysing the data received in the request, which
  ended up being a securety vulnerability. Apparently this is not done by modern browsers.
  For ref: https://en.wikipedia.org/wiki/Content_sniffing
  Poor IE seems to always be associated with bad decisions throughout the internet history.
*/

import { createServer } from "http";

const server = createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>home page</h1>");
    res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>about page</h1>");
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>page not found</h1>");
    res.end();
  }
});

server.listen(5000);
