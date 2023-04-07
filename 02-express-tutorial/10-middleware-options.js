import express from "express";
import morgan from "morgan";

const PORT = 5000;
const app = express();

// Using a third party middleware
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.listen(PORT, () => `Started the server on port ${PORT}...`);
