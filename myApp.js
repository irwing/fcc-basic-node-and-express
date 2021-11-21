require('dotenv').config();
var express = require('express');
var app = express();

const BASEPATH = __dirname;

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
app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({
      "message": "HELLO JSON"
    });
  }
    res.json({
      "message": "Hello json"
    });  
});

module.exports = app;