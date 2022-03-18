import React from 'react';
import DeleteSongButton from './Buttons/DeleteSongButton';
import EditSongButton from './Buttons/EditSongButton';

function SongCard({ songData }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="grow text-center">{songData['Artist.name']} - {songData.name} </span>
      <EditSongButton songId={songData.id} />
      <DeleteSongButton songId={songData.id} />
    </div>
  );
}

export default SongCard;
