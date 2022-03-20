import React, { useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function NewSong(props) {

  const { id } = useParams()
  const artistRef = useRef()
  const songRef = useRef()
  const status = useRef()

  const queryClient = useQueryClient()
  const songQuery = useQuery(`song-${id}`, () => axios(`/api/songs/${id}`))
  const allArtistsQuery = useQuery('allAtrists', () => axios({
    url: '/api/artists'
  }))

  const saveSong = useMutation(() =>
    axios.put(`/api/songs/${id}`, {
      artistId: artistRef.current.value,
      name: songRef.current.value
    }), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(`song-${id}`)
      status.current = 'Композиция изменена'
    },
    onError: (err) => {
      switch (err.response.status) {
        case 400:
          status.current = 'Название композиции не может быть пустым'
          break;
        default:
          status.current = "Ошибка"
          break;
      }
    }
  })

  useEffect(() => { }, [])

  if (allArtistsQuery.isLoading || songQuery.isLoading) return (<>Загрузка</>)
  if (allArtistsQuery.isError || songQuery.isError) return (<>Ошибка</>)
  if (allArtistsQuery.data.status === 204) return (
    <div className="mt-2">Сначала добавьте исполнителя в базу</div>
  )
  if (songQuery.data.status === 204) return (
    <div className="mt-2">Композиция не существует</div>
  )

  const allArtistsInfo = allArtistsQuery.data.data
  const songInfo = songQuery.data.data

  return (
    <form className="flex flex-col gap-2 mt-4 mx-auto max-w-md">
      <div className="flex gap-2">
        <label htmlFor="artistName" className="flex flex-col flex-1 gap-2">
          <span>Имя исполнителя:</span>
          <select ref={artistRef} name="artistName" className="select" defaultValue={songInfo['Artist.id']}>
            {allArtistsInfo.map(artist =>
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            )}
          </select >
        </label>
        <label htmlFor="songName" className="flex flex-col flex-1 gap-2">
          <span>Название композиции</span>
          <input type="text" ref={songRef} className="inp-text" defaultValue={songInfo.name} />
        </label>
      </div>
      <button className="btn-form" onClick={(event) => {
        event.preventDefault();
        saveSong.mutate()
      }}>Изменить</button>
      <div className="text-center">{!!status.current && status.current}</div>
    </form >
  );
}

export default NewSong;
