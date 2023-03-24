/*
  A query string is part of a URL that we can use to pass values
  to our server.
*/

import express from "express";
import { products } from "./data.js";

const PORT = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>Home Page</h1>
            <a href="/api/products">Products</a>
  `);
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((p) => {
    // Alternatively:
    // const { desc, price, ...rest } = p;
    // return rest;

    const { id, name, image } = p;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === Number(id));
  // if the id is not valid, return Not Found
  if (product === undefined) {
    return res.status(404).send("Product not found");
  }

  res.json(product);
});

// adapted to always return a response of {success:boolean, data:array, reason:string|empty}
app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((p) => p.name.startsWith(search));
  }

  if (limit) {
    // non numeric inputs for limit would result in an empty arr
    // my choice was to require a valid limit to perform the query
    if (isNaN(limit)) {
      return res.status(400).send({
        success: false,
        reason: "Could not parse the limit query string",
      });
    }
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts.length === 0) {
    return res.status(200).json({ success: true, data: [] });
  }

  return res.status(200).json({ success: true, data: sortedProducts });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
