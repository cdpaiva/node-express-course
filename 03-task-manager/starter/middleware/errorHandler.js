const { CustomAPIError } = require("../errors/customError.js");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(400).json({ msg: typeof err });
};

module.exports = errorHandler;
