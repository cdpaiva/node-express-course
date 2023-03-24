/*
  In express, we set callbacks to specific routes directly.
  It's similar to the http module, but more straightforward.
  In http, we needed to parse the url ourselves and compare
  with the routes we wanted to create.
  We also have a default '404' in express, while in the http
  module, if we don't cover a Page not found request, the 
  server will send nothing back.

  Added a few <a> tags, so it's easier to navigate between
  the routes we created.
*/

import express from "express";

const PORT = 5000;
const app = express();

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Home Page</h1>
            <a href='/about'>About</a>
            <a href='/no-route'>This link is broken</a>`);
});

app.get("/about", (req, res) => {
  res.status(200).send(`<h1>About Page</h1>
            <a href='/'>Home</a>`);
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>404 - Page not found</h1>");
});

app.listen(PORT, () => console.log(`Started the server on port ${PORT}...`));
