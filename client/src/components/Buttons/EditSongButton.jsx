import React from 'react';
import { useNavigate } from 'react-router-dom';


function EditSongButton({ songId }) {

  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(`/songs/edit/${songId}`)} className="btn-song" >Редактировать</button >
  )
}

export default EditSongButton;
