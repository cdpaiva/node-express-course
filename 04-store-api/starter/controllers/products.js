const Product = require("../models/product.js");

const getAllProductsStatic = async (req, res) => {
  const search = "ab";
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("name")
    .select("name price")
    .limit(10);
  res.status(200).json({ itemsFound: products.length, products });
};

/*
  If find receives keys that are not defined in the model, it will try to filter the collection anyways
  In this case, we'll get an empty array, because no elements will have that key
*/
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  //TODO: currently does not work with more than one filter for the same property
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };
    const regEx = /\b(<|>|>=|=|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  if (sort) {
    const parsedSort = sort.replace(",", " ");
    result.sort(parsedSort);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const parsedFields = fields.replace(",", " ");
    result = result.select(parsedFields);
  }

  // default values: present first page with 10 results
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; // adjust to skip the values page by page

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ itemsFound: products.length, products });
};

module.exports = { getAllProductsStatic, getAllProducts };
