/*
  express.static will look for the files in the /public folder.
  If we have a file styles.css in the public folder, express will
  serve that file when we request http://localhost:3000/styles.css,
  because it will try to match the request url to a file in the
  folder we passed to it.
*/

import express from "express";

const PORT = 5000;
const app = express();

//use static files
app.use(express.static("./public"));

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(PORT, () => console.log(`Started the server on port ${PORT}...`));
