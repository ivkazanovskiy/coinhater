import axios from 'axios';
import React, { useRef } from 'react';
import { useMutation } from 'react-query';

function NewArtist(props) {

  const status = useRef()
  const artistNameRef = useRef()

  const addNewArtist = useMutation(() =>
    axios.post('/api/artists', {
      name: artistNameRef.current.value
    }), {
    onSuccess: (res) => {
      status.current = 'Исполнитель добавлен в базу'
      artistNameRef.current.value = ''
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
    <form className="flex flex-col gap-2 w-full max-w-md mt-4 mx-auto">
      <label htmlFor="name" className="text-center">Введите имя исполнителя:</label>
      <input ref={artistNameRef} type="text" name="name" id="name" className="inp-text" />
      <button className="btn-form" onClick={(event) => {
        event.preventDefault();
        addNewArtist.mutate()
      }}>Добавить</button>
      <div className="text-center">{!!status.current && status.current}</div>
    </form>
  );
}

export default NewArtist;
