const express = require('express');
const path = require('path');

const helmet = require('helmet');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const corsConfig = require('./config/corsConfig');
const artistRouter = require('./routes/artistRouter');
const songRouter = require('./routes/songRouter');
const dbConnectionChecker = require('./helpers/dbConnectionChecker');

const app = express();

const PORT = process.env.PORT ?? 4000;

logger.token('error', (req) => req.error);

app.use(helmet());
app.use(logger(':date[clf] :method :url :req[x-forwarded-for] :error'));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

app.use('/api/artists', artistRouter);
app.use('/api/songs', songRouter);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`The server is listening ${PORT} port`);
  dbConnectionChecker();
});
