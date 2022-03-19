import React, { useRef } from 'react';
import { useQuery } from 'react-query'
import axios from 'axios'
import SongCard from '../components/SongCard';
import ArtistChechbox from '../components/ArtistChechbox';
import SongFilter from '../components/SongFilter';
import { useLocation, useParams } from 'react-router-dom';
import SongList from '../components/SongList';

function AllSongs(props) {

  const { search: query } = useLocation()

  return (
    <div className="flex h-full">
      <SongFilter key={query} query={query} />
      <SongList query={query} />
    </div>
  );
}

export default AllSongs;
