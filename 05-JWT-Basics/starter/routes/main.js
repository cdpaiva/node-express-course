const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main.js");

const authMiddleware = require("../middleware/auth.js");

// authMiddleware is set only to the dashboard route
// passing multiple handlers will create a pipe where the request goes through
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
