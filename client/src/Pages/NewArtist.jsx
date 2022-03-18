import axios from 'axios';
import React, { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

function NewArtist(props) {

  const queryClient = useQueryClient()
  const status = useRef()
  const artistNameRef = useRef()

  const addNewArtist = useMutation(() =>
    axios.post('/api/artists/new', {
      name: artistNameRef.current.value
    }), {
    onSuccess: (res) => {
      queryClient.invalidateQueries('allArtists')
      queryClient.invalidateQueries('allSongs')
      status.current = 'Исполнитель добавлен в базу'
    },
    onError: (err) => {
      switch (err.response.status) {
        case 400:
          status.current = 'Имя не может быть пустым'
          break;
        case 409:
          status.current = 'Данный исполнитель уже существует'
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

  return (
    <div className="flex flex-col gap-2 w-96 mt-4">
      <label htmlFor="name" className="text-center">Введите имя исполнителя:</label>
      <input ref={artistNameRef} type="text" name="name" id="name" className="inp-text" />
      <button className="btn-form" onClick={() => addNewArtist.mutate()}>Добавить</button>
      <div className="text-center">{!!status.current && status.current}</div>
    </div>
  );
}

export default NewArtist;