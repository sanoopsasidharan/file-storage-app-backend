var express = require("express");
const { adminLogin } = require("../controller/admin");
const { verifyAdminToken } = require("../middleware/jwt");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// login admin
router.post("/login", adminLogin);

router.post("/IsAdminLogin", verifyAdminToken, (req, res, next) => {
  let payload = req.payload;
  res.json({ user: true, payload });
});

module.exports = router;
