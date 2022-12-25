var express = require("express");
const {
  adminLogin,
  usersListing,
  listingfiles,
  LogoutAdmin,
} = require("../controller/admin");
const { verifyAdminToken } = require("../middleware/jwt");
var router = express.Router();

// login admin
router.post("/login", adminLogin);

// listing all users
router.get("/user-list", verifyAdminToken, usersListing);

// listing users files
router.get("/files", verifyAdminToken, listingfiles);

// adminlogout
router.post("/logout", LogoutAdmin);

router.post("/IsAdminLogin", verifyAdminToken, (req, res, next) => {
  let payload = req.payload;
  res.json({ user: true, payload });
});

module.exports = router;
