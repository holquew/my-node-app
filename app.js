var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const cors = require("cors");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "gosm0909",
  database: "nodedb"
});

connection.connect();

app.listen(3000, function() {
  console.log("****start!! express server on port 3000****");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");

// url routing
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/main", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/search", function(req, res) {
  res.sendFile(__dirname + "/public/search.html");
});

app.post("/email_post", function(req, res) {
  //get : req.param('email')
  //res.send("<h1>welcome! " + req.body.email + "</h1>");
  res.render("email.ejs", { "email": req.body.email });
});

app.post("/ajax_send_email", function(req, res) {
  console.log(req.body.email);
  var responseData = { "result": "ok", "email": req.body.email };
  res.json(responseData);
  // 서버에서는 JSON.stringify 필요없음
});

app.post("/ajax_search", function(req, res) {
  console.log(req.body.search);
  var responseData = {
    "result": ""
  };
  if (req.body.search !== "")
    responseData = {
      "result": "ok",
      "search": req.body.search,
      "text": req.body.text
    };
  res.json(responseData);
});
