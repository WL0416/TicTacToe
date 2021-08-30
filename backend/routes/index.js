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

router.get("/api/getWsClients", (req, res) => {
  // console.log(wsClients);
  res.status(200).json(wsClients);
});

router.post("/api/updateGame", (req, res) => {
  const { name, board, result, to } = req.body;

  console.log(name, board, to);

  if (wsClients[to] !== undefined) {
    wsClients[to].forEach((client) => {
      client.send(JSON.stringify({ name, board, result }));
    });
  }
  res.status(200).send("update done");
});

module.exports = router;
