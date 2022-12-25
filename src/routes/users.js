var express = require("express");
const { registerUser, loginUser } = require("../controller/user");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create-user", registerUser);

router.post("/login-user", loginUser);

module.exports = router;
