const router = require('express').Router();
const { Song, Artist } = require('../db/models');
const { setPaginationSong } = require('../helpers/pagination');
const { setArtistsCondition, setSongsCondition } = require('../helpers/whereConditions');

router.get('/', async (req, res) => {
  const { query } = req;
  const artistsCondition = setArtistsCondition(query);
  const songsCondition = setSongsCondition(query);
  const pagination = setPaginationSong(query);

  try {
    const songs = await Song.findAll({
      ...pagination,
      where: songsCondition,
      raw: true,
      attributes: ['id', 'name'],
      order: [[Artist, 'name'], ['name']],
      include: {
        model: Artist,
        where: artistsCondition,
        attributes: ['id', 'name'],
      },

    });

    if (songs.length === 0) return res.sendStatus(204);
    return res.status(200).json(songs);
  } catch (err) {
    req.error = err;
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const song = await Song.findOne({
      where: { id },
      raw: true,
      attributes: ['id', 'name'],
      include: {
        model: Artist,
        attributes: ['id', 'name'],
      },
    });

    if (!song) return res.sendStatus(204);
    return res.status(200).json(song);
  } catch (err) {
    req.error = err;
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const { name, artistId } = req.body;
  if (!name || typeof name !== 'string') return res.sendStatus(400);

  try {
    await Song.create({ name, artistId });
    return res.sendStatus(201);
  } catch (err) {
    if (err.original.code === '23505') return res.status(409).json({ message: 'Такая композиция уже существует' });
    if (err.original.code === '23503') return res.status(409).json({ message: 'Автор не найден' });
    req.error = err;
    return res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, artistId } = req.body;
  if (!name || typeof name !== 'string') return res.sendStatus(400);

  try {
    await Song.update({ name, artistId }, { where: { id } });
    return res.sendStatus(201);
  } catch (err) {
    if (err.original.code === '23505') return res.status(409).json({ message: 'Такая композиция уже существует' });
    if (err.original.code === '23503') return res.status(409).json({ message: 'Автор не найден' });
    req.error = err;
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Song.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (err) {
    req.error = err;
    return res.sendStatus(500);
  }
});

module.exports = router;
