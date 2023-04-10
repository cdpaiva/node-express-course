const connectDB = require("./db/connect.js");
const express = require("express");
const tasks = require("./routes/tasks.js");
require("dotenv").config();

const PORT = 3000;
const app = express();

// middleware
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

const startConnection = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Started the server on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

startConnection();
