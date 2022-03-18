const router = require('express').Router();
const { Song, Artist } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const songs = await Song.findAll({
      where: {},
      raw: true,
      attributes: ['id', 'name'],
      // TODO: разобраться с сортировкой
      order: ['name'],
      include: {
        model: Artist,
        attributes: ['id', 'name'],
      },
    });

    if (songs.length === 0) return res.sendStatus(204);
    return res.status(200).json(songs);
  } catch (err) {
    console.log(err.message);
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
      // TODO: разобраться с сортировкой
      include: {
        model: Artist,
        attributes: ['id', 'name'],
      },
    });

    if (!song) return res.sendStatus(204);
    return res.status(200).json(song);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(500);
  }
});

router.post('/new', async (req, res) => {
  const { name, artistId } = req.body;
  if (!name || typeof name !== 'string') return res.sendStatus(400);

  try {
    await Song.create({ name, artistId });
    return res.sendStatus(201);
  } catch (err) {
    if (err.original.code === '23505') return res.status(409).json({ message: 'Такая композиция уже существует' });
    if (err.original.code === '23503') return res.status(409).json({ message: 'Автор не найден' });
    console.log(err.message);
    return res.sendStatus(500);
  }
});

router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, artistId } = req.body;
  if (!name || typeof name !== 'string') return res.sendStatus(400);

  try {
    await Song.update({ name, artistId }, { where: { id } });
    return res.sendStatus(201);
  } catch (err) {
    if (err.original.code === '23505') return res.status(409).json({ message: 'Такая композиция уже существует' });
    if (err.original.code === '23503') return res.status(409).json({ message: 'Автор не найден' });
    console.log(err.message);
    return res.sendStatus(500);
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Song.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(500);
  }
});

module.exports = router;
