import React, { useRef } from 'react';
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

function EditArtist(props) {

  const { id } = useParams()
  const artistName = useRef()
  const status = useRef()
  const artistQuery = useQuery(`artist-${id}`, () => axios(`/api/artists/${id}`))
  const queryClient = useQueryClient()

  const saveArtist = useMutation(() =>
    axios.put(`/api/artists/${id}`, {
      name: artistName.current.value
    }), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(`artist-${id}`)
      status.current = 'Имя исполнителя изменено'
    },
    onError: (err) => {
      switch (err.response.status) {
        case 400:
          status.current = 'Имя не может быть пустым'
          break;
        case 451:
          status.current = 'Мы уважаем творчество данного исполнителя, но не можем себе позволить добавить его в нашу базу'
          break;
        default:
          status.current = "Ошибка"
          break;
      }
    }
  })

  if (artistQuery.isLoading) return (<>Загрузка</>)
  if (artistQuery.isError) return (<>Ошибка</>)
  if (artistQuery.data.status === 204) return (
    <div className="mt-2">Исполнитель не найден</div>
  )

  const artistInfo = artistQuery.data.data

  return (
    <form className="flex flex-col mx-auto mt-4 gap-2 max-w-md ">
      <label htmlFor="artistName" className="text-center">Имя исполнителя:</label>
      <input type="text" ref={artistName}
        name="artistName" id="artistName"
        className="inp-text" defaultValue={artistInfo.name}
      />
      <button className="btn-form" onClick={(event) => {
        event.preventDefault();
        saveArtist.mutate()
      }}>Изменить</button>
      <div className="text-center">{!!status.current && status.current}</div>
    </form >
  );
}

export default EditArtist;
