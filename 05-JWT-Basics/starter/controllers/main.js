require("dotenv").config();
const jwt = require("jsonwebtoken");
const BadRequest = require("../errors/bad-request.js");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequest("Please provide username and password");
  }

  const id = new Date().getDate(); // just to mock an id provided by the db
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).send({
    msg: `Hello ${req.user.username}!`,
    secret: `Your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
