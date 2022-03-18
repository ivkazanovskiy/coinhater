import React from 'react';
import { useQuery } from 'react-query'
import axios from 'axios'
import SongCard from '../components/SongCard';

function AllSongs(props) {

  const allSongsQuery = useQuery('allSongs', () => axios({
    url: '/api/songs'
  }))

  if (allSongsQuery.isLoading) return (<>Загрузка</>)
  if (allSongsQuery.isError) return (<>Ошибка</>)
  if (allSongsQuery.data.status === 204) return (<>Композиции отсутствуют</>)

  const allSongsInfo = allSongsQuery.data.data
  console.log(allSongsInfo);

  return (
    <div className=" flex flex-col gap-2 mt-4">
      {allSongsInfo.map(el => <SongCard key={el.id} songData={el} />)}
    </div>
  );
}

export default AllSongs;
