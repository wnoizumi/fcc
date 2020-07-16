
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


//Logging middlewware
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));


// --> 11)  Mount the body-parser middleware  here

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});



app.use(express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  let message = process.env.MESSAGE_STYLE == "uppercase" ? "HELLO JSON" : "Hello json";
  res.json({"message": message});
});


app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
    res.json({"time" : req.time});
});

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", (req, res) => {
  let word = req.params.word;
  res.json({"echo": word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route("/name")
  .get((req, res) => {
  var first = req.query.first;
  var last = req.query.last;
  res.json({"name": first + " " + last});
}).post((req, res) => {
  let body = req.body;
  res.json({"name": body.first + " " + body.last});
});
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !



/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
