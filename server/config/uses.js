const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
// const cors = require('cors');
// const corsConfig = require('./corsConfig');

function uses(app) {
  app.use(helmet());
  app.use(logger(':date[clf] :method :req[x-forwarded-for]'));
  app.use(express.static(path.join(__dirname, '../../client/build')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  // app.use(cors(corsConfig));
}

module.exports = uses;
