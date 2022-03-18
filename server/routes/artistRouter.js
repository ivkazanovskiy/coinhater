const router = require('express').Router();
const { Artist } = require('../db/models');
const isForbidenName = require('../helpers/isForbidenName');

router.get('/', async (req, res) => {
  try {
    const artists = await Artist.findAll({
      raw: true,
      attributes: ['id', 'name'],
      // TODO: добавить сортировку вне зависимости от регистра
      order: ['name'],
    });

    if (artists.length === 0) return res.sendStatus(204);
    return res.status(200).json(artists);
  } catch (err) {
    console.log(err.message);
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
    console.log(err.message);
    return res.sendStatus(500);
  }
});

router.post('/new', async (req, res) => {
  const { name } = req.body;
  if (isForbidenName(name)) return res.sendStatus(451);
  if (!name || typeof name !== 'string') return res.sendStatus(400);

  try {
    await Artist.create({ name });
    return res.sendStatus(201);
  } catch (err) {
    if (err.original.code === '23505') return res.status(409).json({ message: 'Такой исполнитель уже существует' });

    console.log(err.message);
    return res.sendStatus(500);
  }
});

router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (isForbidenName(name)) return res.sendStatus(451);
  if (!name || typeof name !== 'string') return res.sendStatus(400);

  try {
    const [updated] = await Artist.update({ name }, { where: { id } });
    if (!updated) return res.sendStatus(406);
    return res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(500);
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Artist.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(500);
  }
});

module.exports = router;
