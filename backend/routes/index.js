var express = require("express");
var router = express.Router();

const { emailSender } = require("../functions/email");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/api/sendEmail", (req, res) => {
  emailSender(req, res);
});

module.exports = router;
