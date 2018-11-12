const express = require('express');
const bodyParser = require('body-parser');

// const authenticate = require('../middleware/authenticate').authenticate;
const apiRoutes = require('./api/routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// res.header("Access-Control-Allow-Credentials", true);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS');
  next();
});
app.use(apiRoutes);

// const server = require('http').createServer(app);
const port = process.env.PORT;
const ip = process.env.IP || 'localhost';

app.listen(port, () => {
  console.log(
    'Express server listening on http://%s:%d, in %s mode',
    ip,
    port,
    process.env.NODE_ENV
  );
});
