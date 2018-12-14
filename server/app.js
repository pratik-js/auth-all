const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// const authenticate = require('../middleware/authenticate').authenticate;
const apiRoutes = require('./api/routes');

var app = express();
app.use(morgan('combined'));
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
app.use('/api', apiRoutes);
app.use(express.static(__dirname + '/../ui'));
app.get('*', function(req, res) {
  res.sendFile(__dirname + '../ui/index.html');
  //__dirname : It will resolve to your project folder.
});
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
