var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.files);

  fs.readFile(req.files.file.path, function (err, data) {
    console.log(err);
    console.log(data);
    // Do something with the data (which holds the file information)
  });
});

module.exports = router;
