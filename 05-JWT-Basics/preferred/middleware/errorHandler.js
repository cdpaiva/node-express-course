const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err);
  }
  return res.status(500).send("Something went wrong try again later");
};

module.exports = errorHandler;
