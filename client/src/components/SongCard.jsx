import React from 'react';
import DeleteSongButton from './Buttons/DeleteSongButton';
import EditSongButton from './Buttons/EditSongButton';

function SongCard({ songData }) {
  return (
    <div className="flex gap-2 items-center w-3/4">
      <span className="flex-1 text-center overflow-clip">{songData['Artist.name']} - {songData.name} </span>
      <EditSongButton songId={songData.id} />
      <DeleteSongButton songId={songData.id} />
    </div>
  );
}

export default SongCard;
