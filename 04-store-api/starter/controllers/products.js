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

  const options = ["price", "rating"];
  const parsedNumericFilters = numericFilters
    .split(",")
    .map((q) => parseQuery(q, options));

  // supports more than one operator per field
  parsedNumericFilters.forEach((p) => {
    if (!p) return;
    queryObject[p.field] ||= {};
    queryObject[p.field][p.operator] = Number(p.value);
  });

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

// Parses que query into {operator,field,value}
// returns null if the field is not in the options
function parseQuery(query, options) {
  const operatorMap = {
    ">": "$gt",
    ">=": "$gte",
    "<": "$lt",
    "<=": "$lte",
    "=": "$eq",
  };
  const regEx = /(^\w+)(<|>|>=|=|<=)(\d+\.?\d?)/g;
  const matches = [...query.matchAll(regEx)];
  const [_, field, operator, value] = matches[0];
  if (!options.includes(field)) {
    return;
  }
  return { operator: operatorMap[operator], field, value };
}

module.exports = { getAllProductsStatic, getAllProducts };
