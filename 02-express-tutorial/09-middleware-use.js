import express from "express";
import { logger } from "./logger.js";
import { authorize } from "./authorize.js";

const PORT = 5000;
const app = express();

app.use([logger, authorize]);
// app.use("/about",logger); // can also apply middleware to specific paths with app.use

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.listen(PORT, () => `Started the server on port ${PORT}...`);
