import React from 'react';
import DeleteArtistButton from './Buttons/DeleteArtistButton';
import EditArtistButton from './Buttons/EditArtistButton';

function ArtistCard({artistData }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="grow text-center">{artistData.name} </span>
      <EditArtistButton artistId={artistData.id} />
      <DeleteArtistButton artistId={artistData.id} />
    </div>
  );
}

export default ArtistCard;
