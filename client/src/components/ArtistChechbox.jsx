import React from 'react';

function ArtistChechbox({ artist, changeSelectedArtists }) {
  return (
    <label htmlFor={artist.id}>
      <input
        type="checkbox"
        name="artist"
        id={artist.id}
        onChange={() => changeSelectedArtists(artist.id)} />
      {artist.name}
    </label>
  );
}

export default ArtistChechbox;
