import React from 'react';
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

function DeleteSongButton({ songId }) {
  const queryClient = useQueryClient()

  const deleteSong = useMutation(() =>
    axios.delete(`/api/songs/delete/${songId}`)
    , {
      onSuccess: () => queryClient.invalidateQueries('allSongs')
    })

  return (
    <button onClick={() => deleteSong.mutate()} className="btn-song">Удалить</button>
  );
}

export default DeleteSongButton;
