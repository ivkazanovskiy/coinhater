import React, { useRef } from 'react';
import { useQuery } from 'react-query'
import axios from 'axios'
import SongCard from '../components/SongCard';
import ArtistChechbox from '../components/ArtistChechbox';
import SongFilter from '../components/SongFilter';

function AllSongs(props) {

  const allSongsQuery = useQuery('allSongs', () => axios({
    url: '/api/songs'
  }))
  const allArtistsQuery = useQuery('allArtists', () => axios({
    url: '/api/artists'
  }))

  if (allSongsQuery.isLoading || allArtistsQuery.isLoading) return (<>Загрузка</>)
  if (allSongsQuery.isError || allArtistsQuery.isLoading) return (<>Ошибка</>)
  if (allSongsQuery.data.status === 204) return (<>Композиции отсутствуют</>)

  const allSongsInfo = allSongsQuery.data.data

  return (
    <>
      <SongFilter />
      <div className=" flex flex-col gap-2 mt-4">
        {allSongsInfo.map(el => <SongCard key={el.id} songData={el} />)}
      </div>
    </>
  );
}

export default AllSongs;
