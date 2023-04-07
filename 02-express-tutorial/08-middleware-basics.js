// Middleware sits in between the request and response objects
// They intercept the request, do their actions and pass the incoming request to the next middleware
// They could also send a response right away

// The order of the functions determines which callbacks will be executed
import express from "express";
import { logger } from "./logger.js";

const PORT = 5000;
const app = express();

app.get("/", logger, (req, res) => {
  res.send("Home");
});

app.get("/about", logger, (req, res) => {
  res.send("About");
});

app.listen(PORT, () => `Started the server on port ${PORT}...`);
