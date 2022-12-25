var express = require("express");
const { registerUser, loginUser } = require("../controller/user");
const { verifyAccessToken } = require("../middleware/jwt");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create-user", registerUser);

router.post("/login-user", loginUser);

router.post("/isLoggedin", verifyAccessToken, (req, res, next) => {
  let payload = req.payload;
  res.json({ user: true, payload });
});

module.exports = router;
