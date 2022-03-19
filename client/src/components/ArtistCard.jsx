import React from 'react';
import DeleteArtistButton from './Buttons/DeleteArtistButton';
import EditArtistButton from './Buttons/EditArtistButton';

function ArtistCard({artistData }) {
  return (
    <div className="flex gap-2 items-center w-3/4 ">
      <span className="flex-1 text-center overflow-clip">{artistData.name}</span>
      <EditArtistButton artistId={artistData.id} />
      <DeleteArtistButton artistId={artistData.id} />
    </div>
  );
}

export default ArtistCard;
