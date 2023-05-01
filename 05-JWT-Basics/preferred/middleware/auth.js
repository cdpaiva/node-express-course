const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).send({ message: "unauthorized" });
    return;
  }

  const token = header.split(" ")[1];
  const decoded = await decodeTokenAsync(token);

  req.user = { name: decoded.username };

  next();
};

const decodeTokenAsync = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });
};

module.exports = auth;
