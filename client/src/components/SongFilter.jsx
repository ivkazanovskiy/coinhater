import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import ArtistChechbox from './ArtistChechbox';
import { toStringDate } from '../helpers/toStringDate'

function SongFilter({ query }) {

  const queryObj = new URLSearchParams(query)

  const artistIdsDefault = queryObj.get('artistIds')?.split(',').map(id => Number(id))
  const songPartDefault = queryObj.get('songPart')
  const selectedDateSongDefault = queryObj.get('selectedDateSong')
  const pagePaginationSongDefault = queryObj.get('pagePaginationSong')
  const limitPaginationSongDefault = queryObj.get('limitPaginationSong')

  const isPaginationSong = !!(pagePaginationSongDefault && limitPaginationSongDefault)

  const navigate = useNavigate()
  const [selectedAtrists, setSelectedAtrists] = useState(artistIdsDefault ? artistIdsDefault : [])
  const [disabledDateSong, setDisabledDateSong] = useState(!selectedDateSongDefault)
  const [disabledPaginationSong, setDisabledPaginationSong] = useState(!isPaginationSong)

  const songPartRef = useRef()
  const selectedDateSongRef = useRef()
  const pagePaginationSongRef = useRef()
  const limitPaginationSongRef = useRef()

  const allArtistsQuery = useQuery('allArtists', () => axios({
    url: '/api/artists'
  }))

  const changeSelectedArtists = useCallback((id) => {
    if (selectedAtrists.includes(id)) {
      setSelectedAtrists(selectedAtrists.filter(el => el !== id))
    } else {
      setSelectedAtrists([...selectedAtrists, id])
    }
  }, [selectedAtrists])

  const applyFilter = () => {
    const data = {};
    if (selectedAtrists.length > 0) data.artistIds = selectedAtrists
    if (songPartRef.current.value) data.songPart = songPartRef.current.value
    if (!disabledDateSong) data.selectedDateSong = selectedDateSongRef.current.value
    if (!disabledPaginationSong) {
      data.pagePaginationSong = pagePaginationSongRef.current.value
      data.limitPaginationSong = limitPaginationSongRef.current.value
    }

    const params = new URLSearchParams(data);
    navigate(`/songs?${params.toString()}`)
  }

  if (allArtistsQuery.isLoading) return (<>Загрузка</>)
  if (allArtistsQuery.isError) return (<>Ошибка</>)

  const allArtistsInfo = allArtistsQuery.data.data

  return (
    <aside className="flex flex-col gap-4 py-4 px-2 h-full w-96 border-r-2">
      <button onClick={() => applyFilter()} className="btn-form">Применить сортировку</button>
      <div className="flex flex-col gap-2">
        <label htmlFor="selectedDateSongFlag" className="flex gap-2 items-center">
          <input type="checkbox" name="selectedDateSongFlag"
            id="selectedDateSongFlag" onChange={() => setDisabledDateSong(!disabledDateSong)}
            defaultChecked={!!selectedDateSongDefault} />
          <span>Выбрать композиции добавленные:</span>
        </label>
        <input
          type="date" name="selectedDateSong"
          id="selectedDateSong" ref={selectedDateSongRef}
          className={`inp-text ${disabledDateSong && 'bg-red-100'}`}
          defaultValue={selectedDateSongDefault ? selectedDateSongDefault : toStringDate(new Date())}
          disabled={disabledDateSong} />
      </div>
      <label htmlFor="artistPart" className="flex flex-col gap-2">
        <span>Искать в названии композиции:</span>
        <input type="text" name="artistPart" id="artistPart"
          className="inp-text" ref={songPartRef}
          defaultValue={songPartDefault}
        />
      </label>
      <div>
        <label htmlFor="paginationSongFlag" className="flex gap-2 items-center">
          <input type="checkbox" name="paginationSongFlag"
            id="paginationSongFlag" onChange={() => setDisabledPaginationSong(!disabledPaginationSong)}
            defaultChecked={!disabledPaginationSong} />
          <span>Применить частичную выборку:</span>
        </label>
        <div className="flex gap-2 grow">
          <label htmlFor="pagePaginationSong" className="flex flex-col gap-2">
            <span>Порядковый номер:</span>
            <input
              type="number" min="1" name="pagePaginationSong"
              id="pagePaginationSong" ref={pagePaginationSongRef}
              className={`inp-text ${disabledPaginationSong && 'bg-red-100'}`}
              defaultValue={pagePaginationSongDefault ? pagePaginationSongDefault : 1}
              disabled={disabledPaginationSong} />
          </label>
          <label htmlFor="limitPaginationSong" className="flex flex-col gap-2">
            <span>Количество записей:</span>
            <input
              type="number" min="1" name="limitPaginationSong"
              id="limitPaginationSong" ref={limitPaginationSongRef}
              className={`inp-text ${disabledPaginationSong && 'bg-red-100'}`}
              defaultValue={limitPaginationSongDefault ? limitPaginationSongDefault : 5}
              disabled={disabledPaginationSong} />
          </label>
        </div>
      </div>
      <span>Выбрать исполнителей:</span>
      <div htmlFor="selectAtrists" className="flex flex-col flex-1 gap-2 overflow-y-auto">
        <div id="selectAtrists" className="flex-1 pb-4 pl-2 flex flex-col">
          {allArtistsInfo.length > 0
            ?
            allArtistsInfo.map(el => <ArtistChechbox
              key={`${el.id}-checked-${artistIdsDefault?.includes(el.id)}`}
              artist={el}
              checked={artistIdsDefault?.includes(el.id)}
              changeSelectedArtists={changeSelectedArtists} />)
            : <span>Исполнители отсутствуют</span>
          }
        </div>
      </div>

    </aside >
  );
}

export default SongFilter;
