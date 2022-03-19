const { Op } = require('sequelize');

function setArtistsCondition(query) {
  const {
    artistIds,
    artistPart,
    selectedDateArtist,
  } = query;

  const condition = {};

  if (artistIds) {
    const idList = artistIds.split(',').map((id) => Number(id));
    condition.id = idList;
  }

  if (selectedDateArtist) {
    condition.createdAt = {
      [Op.gt]: new Date(selectedDateArtist),
      [Op.lt]: new Date(new Date(selectedDateArtist).getTime() + 24 * 60 * 60 * 1000),
    };
  }

  if (artistPart) condition.name = { [Op.substring]: artistPart };
  return condition;
}

function setSongsCondition(query) {
  const {
    songPart, selectedDateSong,
  } = query;
  const condition = {};

  if (selectedDateSong) {
    condition.createdAt = {
      [Op.gt]: new Date(selectedDateSong),
      [Op.lt]: new Date(new Date(selectedDateSong).getTime() + 24 * 60 * 60 * 1000),
    };
  }
  if (songPart) condition.name = { [Op.substring]: songPart };

  return condition;
}

module.exports = { setArtistsCondition, setSongsCondition };
