import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import ArtistCard from '../components/ArtistCard';

function ArtistList({ query }) {

  const allArtistsQuery = useQuery(`allArtists${query}`, () => axios({
    url: `/api/artists${query}`
  }), {
    cacheTime:
      query ? 0 : 5 * 60 * 1000
  })

  if (allArtistsQuery.isLoading) return (<>Загрузка</>)
  if (allArtistsQuery.isError) return (<>Ошибка</>)
  if (allArtistsQuery.data.status === 204) return (
    <div className="w-full mt-4 text-center">
      Исполнители отсутствуют
    </div>)

  const allArtistsInfo = allArtistsQuery.data.data

  return (
    <div className="flex flex-col items-center gap-2 py-4 h-full w-full overflow-y-auto">
      {allArtistsInfo.map(artist => <ArtistCard key={artist.id} artistData={artist} />)}
    </div>
  );
}

export default ArtistList;
