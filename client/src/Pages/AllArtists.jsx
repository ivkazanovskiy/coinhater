import React from 'react';
import { useLocation } from 'react-router-dom';

import ArtistList from '../components/ArtistList';
import ArtistFilter from '../components/ArtistFilter';

function AllArtists(props) {

  const { search: query } = useLocation()

  return (
    <div className="flex h-full">
      <ArtistFilter query={query} />
      <ArtistList query={query} />
    </div>

  );
}

export default AllArtists;
