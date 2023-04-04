/*
  Most of what is going on here was discussed in 05-express-all-static.
  Also added a 'custom' Page not Found, for all the non-mapped requests.
*/

import express from "express";
import { consoleLog } from "./practice-middleware.js";

const PORT = 3000;
const app = express();

app.use(express.static("./new-public"));
app.use(consoleLog);

app.get("/sample", (req, res) => {
  return res.send("This is working");
});

app.get("*", (req, res) => {
  return res.status(404).send("Page not found");
});

app.listen(PORT, () => console.log(`Started the server at port ${PORT}`));
