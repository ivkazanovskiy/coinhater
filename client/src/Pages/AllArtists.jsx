import React from 'react';
import { useQuery } from 'react-query'
import axios from 'axios'
import ArtistCard from '../components/ArtistCard';

function AllArtists(props) {

  const allArtistsQuery = useQuery('allArtists', () => axios(`/api/artists`))

  if (allArtistsQuery.isLoading) return (<></>)
  if (allArtistsQuery.isError) return (<>Ошибка</>)

console.log(allArtistsQuery.data.data);

  return (
    <div className=" flex flex-col gap-2 mt-4">
      {allArtistsQuery.data.data.map(el => <ArtistCard key={el.id} artistData={el} />)}
    </div>
  );
}

export default AllArtists;
