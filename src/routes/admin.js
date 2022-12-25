var express = require("express");
const {
  adminLogin,
  usersListing,
  listingfiles,
} = require("../controller/admin");
const { verifyAdminToken } = require("../middleware/jwt");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// login admin
router.post("/login", adminLogin);

// listing all users
router.get("/user-list", verifyAdminToken, usersListing);

// listing users files
router.get("/files", verifyAdminToken, listingfiles);

router.post("/IsAdminLogin", verifyAdminToken, (req, res, next) => {
  let payload = req.payload;
  res.json({ user: true, payload });
});

module.exports = router;
