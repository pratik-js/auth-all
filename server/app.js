const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const { initMongoDB } = require('./mongodb/connect');

// const authenticate = require('../middleware/authenticate').authenticate;
const appRoutes = require('./api/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// res.header("Access-Control-Allow-Credentials", true);

app.use(function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS');
  next();
});
app.use(appRoutes);
app.use(express.static(path.resolve('./ui')));
app.get('*', function(req, res) {
  res.sendFile(path.resolve('./ui/index.html'));
});
const port = process.env.PORT || 3210;
const ip = process.env.IP || 'localhost';
process.env.NODE_ENV === 'DEV' && app.use(morgan('tiny'));
(async () => {
  await initMongoDB();
  app.listen(port, () => {
    console.info(
      'Express server listening on http://%s:%d, in %s mode',
      ip,
      port,
      process.env.NODE_ENV
    );
  });
})();
