import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import SongCard from './SongCard';

function SongList({ query }) {
  const allSongsQuery = useQuery(`allSongs${query}`, () => axios({
    url: `/api/songs${query}`
  }), {
    cacheTime:
      query ? 0 : 5 * 60 * 1000
  })

  if (allSongsQuery.isLoading) return (<>Загрузка</>)
  if (allSongsQuery.isError) return (<>Ошибка</>)
  if (allSongsQuery.data.status === 204) return (
    <div className="w-full mt-4 text-center">
      Композиции отсутствуют
    </div>)

  const allSongsInfo = allSongsQuery.data.data

  return (
    <div className="flex flex-col items-center gap-2 py-4 h-full w-full overflow-y-auto">
      {allSongsInfo.map(el => <SongCard key={el.id} songData={el} />)}
    </div>
  );
}

export default SongList;
