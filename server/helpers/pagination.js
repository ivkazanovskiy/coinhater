function setPaginationArtist(query) {
  const {
    pagePaginationArtist,
    limitPaginationArtist,
  } = query;

  const pagination = {};

  if (pagePaginationArtist && limitPaginationArtist) {
    pagination.limit = Number(limitPaginationArtist);
    pagination.offset = pagination.limit * (Number(pagePaginationArtist) - 1);
  }

  return pagination;
}

function setPaginationSong(query) {
  const {
    pagePaginationSong,
    limitPaginationSong,
  } = query;

  const pagination = {};

  if (pagePaginationSong && limitPaginationSong) {
    pagination.limit = Number(limitPaginationSong);
    pagination.offset = pagination.limit * (Number(pagePaginationSong) - 1);
  }

  return pagination;
}

module.exports = {
  setPaginationArtist,
  setPaginationSong,
};
