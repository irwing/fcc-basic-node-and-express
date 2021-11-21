require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser')

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const BASEPATH = __dirname;

// return time now
const getNow = () => new Date().toString();

// load static resources
app.use('/public', express.static(`${BASEPATH}/public`));

// middleware logs
app.use((req, res, next) => {
  const method = req.method;
  const path = req.path;
  const ip = req.ip;
  console.log(`${method} ${path} - ${ip}`);
  next();
});

// init route
app.get('/', (req, res) => {
  const file = `${BASEPATH}/views/index.html`;
  res.sendFile(file);
});

// json route
app.get("/json", (req, res) => {
  (process.env.MESSAGE_STYLE === 'uppercase')
    ? res.json({ "message": "HELLO JSON" })
    : res.json({ "message": "Hello json" });
});

// time route
app.get("/now", 
  (req, res, next) => {
    req.time = getNow();
    next();
  },
  (req, res) => res.json({ "time": req.time })
);

// echo route
app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ "echo": word });
});

// names route
app
  .route("/name")
  .get((req, res) => {
    const firstName = req.query.first || "";
    const lastName = req.query.last || "";
    res.json({ "name": `${firstName} ${lastName}` });
  })
  .post((req, res) => {
    const firstName = req.body.first || "";
    const lastName = req.body.last || "";
    res.json({ "name": `${firstName} ${lastName}` });
  });

module.exports = app;