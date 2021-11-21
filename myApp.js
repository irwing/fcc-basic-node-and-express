require('dotenv').config();
var express = require('express');
var app = express();

const BASEPATH = __dirname;

app.use('/public', express.static(`${BASEPATH}/public`));

app.get('/', (req, res) => {
  const file = `${BASEPATH}/views/index.html`;
  res.sendFile(file);
});

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