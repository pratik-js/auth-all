import express from 'express';
import bodyParser from 'body-parser';

// import { authenticate } from'./middleware/authenticate';
import apiRoutes from './api/router';

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

const server = require('http').createServer(app);
const port = process.env.PORT;
const ip = process.env.IP;
setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(
      'Express server listening on http://%s:%d, in %s mode',
      ip,
      port,
      process.env.NODE_ENV
    );
  });
});

module.exports = { app };
