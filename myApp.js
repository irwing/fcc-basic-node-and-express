var express = require('express');
var app = express();

const BASEPATH = __dirname;

app.use('/public', express.static(`${BASEPATH}/public`));

app.get('/', (req, res) => {

    const file = `${BASEPATH}/views/index.html`;

    res.sendFile(file);
});

module.exports = app;