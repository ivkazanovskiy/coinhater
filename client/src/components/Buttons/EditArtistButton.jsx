import React from 'react';
import { useNavigate } from 'react-router-dom';


function EditArtistButton({ artistId }) {
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate(`/artists/edit/${artistId}`)} className="btn-song" >Редактировать</button >
  )
}

export default EditArtistButton;
