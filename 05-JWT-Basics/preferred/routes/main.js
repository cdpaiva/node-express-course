const express = require("express");
const { logon, hello } = require("../controllers/main");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.route("/logon").post(logon);
router.route("/hello").get(auth, hello);

module.exports = router;
