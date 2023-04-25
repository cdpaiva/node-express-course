const connectDB = require("./db/connect.js");
const express = require("express");
const tasks = require("./routes/tasks.js");
const notFound = require("./middleware/notFound.js");
const errorHandler = require("./middleware/errorHandler.js");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandler);

const startConnection = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Started the server on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

startConnection();
