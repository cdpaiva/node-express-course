/*
    Start a separate connection to the DB
    Remove all current documents
    Save the contents of jsonProducts in the DB
    Finishes the process with a success code (0) or error code(1)
*/

require("dotenv").config();

const connectDB = require("./db/connect.js");
const Product = require("./models/product.js");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await Product.deleteMany(); //reset the DB
    await Product.create(jsonProducts);

    console.log("Products updated to the database");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
