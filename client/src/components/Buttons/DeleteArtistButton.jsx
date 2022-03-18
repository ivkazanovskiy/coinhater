import React from 'react';
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

function DeleteArtistButton({ artistId }) {
  const queryClient = useQueryClient()

  const deleteArtist = useMutation(() =>
    axios.delete(`/api/artists/delete/${artistId}`)
    , {
      onSuccess: () => {
        queryClient.invalidateQueries('allArtists')
        queryClient.invalidateQueries('allSongs')
      }
    })

  return (
    <button onClick={() => deleteArtist.mutate()} className="btn-song">Удалить</button>
  );
}

export default DeleteArtistButton;
