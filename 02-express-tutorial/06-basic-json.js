/*
    res.json() will convert the object passed into JSON 
    and send in the body of the response, also adding 
    the correct headers
*/

import express from "express";
import { products } from "./data.js";

const PORT = 5000;
const app = express();

app.get("/", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
