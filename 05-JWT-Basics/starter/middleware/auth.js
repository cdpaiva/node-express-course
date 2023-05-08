const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error.js");
const UnauthenticatedError = require("../errors/unauthenticated.js");

// if successfull, will add the user property to the request
// adding part of the payload from the JWT to be used in the controller
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, username: decoded.username };
  } catch (err) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }

  next();
};

module.exports = authMiddleware;
