const jwt = require("jsonwebtoken");

const logon = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new Error("Missing params in the logon form");
  }

  const token = await getToken(username, password).catch((err) => next(err));
  const payload = jwt.decode(token);

  res.status(200).send({ token, payload });
};

const getToken = (username) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username },
      process.env.JWT_SECRET,
      { expiresIn: "process.env.JWT_EXPIRES_IN" },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      }
    );
  });
};

const hello = (req, res) => {
  res.status(200).send({ message: `Hello ${req.user.name}` });
};

module.exports = { logon, hello };
