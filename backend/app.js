var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const expressWs = require("express-ws");

var app = express();

expressWs(app);

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

global.wsClients = {};
app.wsClients = wsClients;

// 建立websocket
app.ws("/:wid", (ws, req) => {
  // console.log(req.params.wid);
  if (!wsClients[req.params.wid]) {
    wsClients[req.params.wid] = [];
  }

  wsClients[req.params.wid].push(ws);
  ws.on("close", () => {
    wsClients[req.params.wid] = wsClients[req.params.wid].filter((client) => {
      return client !== ws;
    });
    if (wsClients[req.params.wid].length === 0) {
      delete wsClients[req.params.wid];
    }
  });

  ws.on("message", (msg) => {
    ws.send(msg);
  });
});

setInterval(() => {
  console.log("websocket connection counts:");
  Object.keys(wsClients).forEach((key) => {
    console.log(key, ":", wsClients[key].length);
  });
  console.log("-----------------------------");
}, 10000);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3001, () => {
  console.log("Server is started and listening on port 3001");
});

module.exports = app;
