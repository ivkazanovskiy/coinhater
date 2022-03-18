import React, { useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

function NewSong(props) {

  const artistRef = useRef()
  const songRef = useRef()
  const status = useRef()

  const queryClient = useQueryClient()
  const allArtistsQuery = useQuery('allAtrists', () => axios({
    url: '/api/artists'
  }))

  const addNewSong = useMutation(() =>
    axios.post(`/api/songs/new`, {
      artistId: artistRef.current.value,
      name: songRef.current.value
    }), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(`allSongs`)
      status.current = 'Композиция добавлена в базу'
    },
    onError: (err) => {
      switch (err.response.status) {
        case 400:
          status.current = 'Название композиции не может быть пустым'
          break;
        case 409:
          status.current = 'Данная композиция уже существует'
          break;
        default:
          status.current = "Ошибка"
          break;
      }
    }
  })

  if (allArtistsQuery.isLoading) return (<>Загрузка</>)
  if (allArtistsQuery.isError) return (<>Ошибка</>)
  if (allArtistsQuery.data.status === 204) return (
    <div className="mt-2">Сначала добавьте исполнителя в базу</div>
  )

  const allArtistsInfo = allArtistsQuery.data.data

  return (
    <div className="flex flex-col mt-4 gap-2 w-96">
      <div className="flex gap-2">
        <label htmlFor="artistName" className="flex flex-col gap-2">
          <span>Имя исполнителя:</span>
          <select ref={artistRef} name="artistName" className="select">
            {allArtistsInfo.map(artist =>
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            )}
          </select >
        </label>
        <label htmlFor="songName" className="flex flex-col gap-2">
          <span>Название композиции</span>
          <input type="text" ref={songRef} className="inp-text" />
        </label>
      </div>
      <button className="btn-form" onClick={() => addNewSong.mutate()}>Добавить</button>
      <div className="text-center">{!!status.current && status.current}</div>
    </div >
  );
}

export default NewSong;
