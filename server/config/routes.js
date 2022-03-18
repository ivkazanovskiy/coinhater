const artistRouter = require('../routes/artistRouter');
const songRouter = require('../routes/songRouter');

function routes(app) {
  app.use('/api/artists', artistRouter);
  app.use('/api/songs', songRouter);
}

module.exports = routes;
