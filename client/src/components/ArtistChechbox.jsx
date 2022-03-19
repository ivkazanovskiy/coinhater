import React from 'react';

function ArtistChechbox({ artist, changeSelectedArtists, checked }) {
  return (
    <label htmlFor={artist.id} className="flex items-center gap-2">
      <input
        type="checkbox"
        name="artist"
        defaultChecked={checked}
        id={artist.id}
        onChange={() => changeSelectedArtists(artist.id)} />
      <span>{artist.name}</span>
    </label>
  );
}

export default ArtistChechbox;
