import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import ArtistChechbox from './ArtistChechbox';

function SongFilter(props) {

  const [selectedAtrists, setSelectedAtrists] = useState([])
  const [disabledDate, setDisabledDate] = useState(true)
  const songPartNameRef = useRef()
  const artistPartNameRef = useRef()
  const createdAtRef = useRef()

  const allArtistsQuery = useQuery('allArtists', () => axios({
    url: '/api/artists'
  }))

  const changeSelectedArtists = useCallback((id) => {
    console.log('in func', selectedAtrists);
    if (selectedAtrists.includes(id)) {
      console.log(1);
      setSelectedAtrists(selectedAtrists.filter(el => el !== id))
    } else {
      console.log(2);
      setSelectedAtrists([...selectedAtrists, id])
    }
  }, [selectedAtrists])

  const filter = () => {
    const data = {};
    if (selectedAtrists.length > 0) data.artistIds = selectedAtrists
    if (songPartNameRef.current.value) data.songPart = songPartNameRef.current.value
    if (artistPartNameRef.current.value) data.artistPart = artistPartNameRef.current.value
    if (!disabledDate) data.createdAt = createdAtRef.current.value

    const params = new URLSearchParams(data);
    console.log(params.toString());
  }

  if (allArtistsQuery.isLoading) return (<>Загрузка</>)
  if (allArtistsQuery.isError) return (<>Ошибка</>)

  const allArtistsInfo = allArtistsQuery.data.data

  return (
    <aside className="absolute top-0 left-0 flex flex-col gap-4 mt-4">
      <button onClick={() => filter()} className="btn-form">Применить сортировку</button>
      <div className="flex flex-col gap-2">
        <label htmlFor="createdAtFlag" className="flex gap-2 items-center">
          <input type="checkbox" name="createdAtFlag" id="createdAtFlag" onChange={() => setDisabledDate(!disabledDate)} />
          <span>Выбрать добавленные по дате :</span>
        </label>
        <input
          type="date" name="createdAtDate"
          id="createdAtDate" ref={createdAtRef}
          className={`inp-text ${disabledDate && 'bg-red-100'}`}
          disabled={disabledDate} />
      </div>
      <label htmlFor="artistPartName" className="flex flex-col gap-2">
        <span>Искать в названии композиции</span>
        <input type="text" name="artistPartName" id="artistPartName" className="inp-text" ref={songPartNameRef} />
      </label>
      <label htmlFor="songPartName" className="flex flex-col gap-2">
        <span>Искать в названии исполнителя</span>
        <input type="text" name="songPartName" id="songPartName" className="inp-text" ref={artistPartNameRef} />
      </label>
      <label htmlFor="seletAtrists" className="flex flex-col gap-2">
        <span>Выбрать исполнителей</span>
        <div id="seletAtrists" className="flex flex-col">
          {allArtistsInfo.map(el => <ArtistChechbox key={el.id} artist={el} changeSelectedArtists={changeSelectedArtists} />)}
        </div>
      </label>
    </aside >
  );
}

export default SongFilter;
