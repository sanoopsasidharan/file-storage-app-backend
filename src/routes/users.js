var express = require("express");
const {
  registerUser,
  loginUser,
  addingPdf,
  getfiles,
} = require("../controller/user");
const { verifyAccessToken } = require("../middleware/jwt");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create-user", registerUser);

router.post("/login-user", loginUser);

// add files to db
router.post("/add-file", verifyAccessToken, addingPdf);

// listing files
router.get("/get-files", verifyAccessToken, getfiles);

router.post("/isLoggedin", verifyAccessToken, (req, res, next) => {
  let payload = req.payload;
  res.json({ user: true, payload });
});

module.exports = router;
