const router = require('express').Router();
const { Artist } = require('../db/models');
const isForbidenName = require('../helpers/isForbidenName');
const { setPaginationArtist } = require('../helpers/pagination');
const { setArtistsCondition } = require('../helpers/whereConditions');

router.get('/', async (req, res) => {
  const { query } = req;
  const artistsCondition = setArtistsCondition(query);
  const pagination = setPaginationArtist(query);

  try {
    const artists = await Artist.findAll({
      ...pagination,
      where: artistsCondition,
      raw: true,
      attributes: ['id', 'name'],
      order: ['name'],
    });

    if (artists.length === 0) return res.sendStatus(204);
    return res.status(200).json(artists);
  } catch (err) {
    req.error = err;
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const artist = await Artist.findOne({
      where: { id },
      raw: true,
      attributes: ['id', 'name'],
    });

    if (!artist) return res.sendStatus(204);
    return res.status(200).json(artist);
  } catch (err) {
    req.error = err;
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (isForbidenName(name)) return res.sendStatus(451);
  if (!name || typeof name !== 'string') return res.sendStatus(400);

  try {
    await Artist.create({ name });
    return res.sendStatus(201);
  } catch (err) {
    if (err.original.code === '23505') return res.status(409).json({ message: 'Такой исполнитель уже существует' });

    req.error = err;
    return res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (isForbidenName(name)) return res.sendStatus(451);
  if (!name || typeof name !== 'string') return res.sendStatus(400);

  try {
    const [updated] = await Artist.update({ name }, { where: { id } });
    if (!updated) return res.sendStatus(406);
    return res.sendStatus(201);
  } catch (err) {
    req.error = err;
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Artist.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (err) {
    req.error = err;
    return res.sendStatus(500);
  }
});

module.exports = router;
