const express = require("express");
require("dotenv").config();

const router = require("./routes/main.js");
const notFound = require("./middleware/not-found.js");
const errorHandler = require("./middleware/errorHandler.js");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1", router);
app.use(notFound);
app.use(errorHandler);

app.listen(port, console.log(`Started the server on port ${port}`));
