import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toStringDate } from '../helpers/toStringDate'

function ArtistFilter({ query }) {

  const queryObj = new URLSearchParams(query)

  const artistPartDefault = queryObj.get('artistPart')
  const selectedDateArtistDefault = queryObj.get('selectedDateArtist')
  const pagePaginationArtistDefault = queryObj.get('pagePaginationArtist')
  const limitPaginationArtistDefault = queryObj.get('limitPaginationArtist')

  const isPaginationArtist = !!(pagePaginationArtistDefault && limitPaginationArtistDefault)

  const navigate = useNavigate()
  const [disabledDateArtist, setDisabledDateArtist] = useState(!selectedDateArtistDefault)
  const [disabledPaginationArtist, setDisabledPaginationArtist] = useState(!isPaginationArtist)

  const artistPartRef = useRef()
  const selectedDateArtistRef = useRef()
  const pagePaginationArtistRef = useRef()
  const limitPaginationArtistRef = useRef()

  const applyFilter = () => {
    const data = {};
    if (artistPartRef.current.value) data.artistPart = artistPartRef.current.value
    if (!disabledDateArtist) data.selectedDateArtist = selectedDateArtistRef.current.value
    if (!disabledPaginationArtist) {
      data.pagePaginationArtist = pagePaginationArtistRef.current.value
      data.limitPaginationArtist = limitPaginationArtistRef.current.value
    }
    const params = new URLSearchParams(data);
    navigate(`/artists?${params.toString()}`)
  }

  return (
    <aside className="flex flex-col gap-4 py-4 px-2 h-full w-96 border-r-2">
      <button onClick={() => applyFilter()} className="btn-form">Применить сортировку</button>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="selectedDateArtistFlag" className="flex gap-2 items-center">
          <input type="checkbox" name="selectedDateArtistFlag"
            id="selectedDateArtistFlag" onChange={() => setDisabledDateArtist(!disabledDateArtist)}
            defaultChecked={!!selectedDateArtistDefault} />
          <span>Выбрать исполнителей добавленных:</span>
        </label>
        <input
          type="date" name="selectedDateArtist"
          id="selectedDateArtist" ref={selectedDateArtistRef}
          className={`inp-text ${disabledDateArtist && 'bg-red-100'}`}
          defaultValue={selectedDateArtistDefault ? selectedDateArtistDefault : toStringDate(new Date())}
          disabled={disabledDateArtist} />
      </div>
      <label htmlFor="songPart" className="flex flex-col gap-2">
        <span>Искать в названии исполнителя:</span>
        <input type="text" name="songPart" id="songPart"
          className="inp-text" ref={artistPartRef}
          defaultValue={artistPartDefault}
        />
      </label>
      <div>
        <label htmlFor="paginationAtristFlag" className="flex gap-2 items-center">
          <input type="checkbox" name="paginationAtristFlag"
            id="paginationAtristFlag" onChange={() => setDisabledPaginationArtist(!disabledPaginationArtist)}
            defaultChecked={!disabledPaginationArtist} />
          <span>Применить частичную выборку:</span>
        </label>
        <div className="flex gap-2 grow">
          <label htmlFor="pagePaginationArtist" className="flex flex-col gap-2">
            <span>Порядковый номер:</span>
            <input
              type="number" min="1" name="pagePaginationArtist"
              id="pagePaginationArtist" ref={pagePaginationArtistRef}
              className={`inp-text ${disabledPaginationArtist && 'bg-red-100'}`}
              defaultValue={pagePaginationArtistDefault ? pagePaginationArtistDefault : 1}
              disabled={disabledPaginationArtist} />
          </label>
          <label htmlFor="limitPaginationArtist" className="flex flex-col gap-2">
            <span>Количество записей:</span>
            <input
              type="number" min="1" name="limitPaginationArtist"
              id="limitPaginationArtist" ref={limitPaginationArtistRef}
              className={`inp-text ${disabledPaginationArtist && 'bg-red-100'}`}
              defaultValue={limitPaginationArtistDefault ? limitPaginationArtistDefault : 5}
              disabled={disabledPaginationArtist} />
          </label>
        </div>
      </div>
    </aside >
  );
}

export default ArtistFilter;
