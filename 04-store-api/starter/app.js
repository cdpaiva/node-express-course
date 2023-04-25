require("dotenv").config();
require("express-async-errors");
//async errors

const express = require("express");
const app = express();

const connectDB = require("./db/connect.js");

const productsRouter = require("./routes/products.js");

//TODO; isolate the middleware in a single file
const notFoundMiddleware = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>products api</a>");
});

app.use("/api/v1/products", productsRouter);

//products route
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Started the server on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
