import { Routes, Route } from 'react-router-dom'

import Topmenu from './components/Topmenu';
import AllArtists from './Pages/AllArtists';
import AllSongs from './Pages/AllSongs';
import EditArtist from './Pages/EditArtist';
import EditSong from './Pages/EditSong';
import NewArtist from './Pages/NewArtist';
import NewSong from './Pages/NewSong';

function App() {

  return (
    <>
      <Topmenu />
      <section className="w-full h-full pt-24 ">
        <Routes>
          <Route path="/" element={<AllSongs />} />

          <Route path="/artists" element={<AllArtists />} />
          <Route path="/artists/new" element={<NewArtist />} />
          <Route path="/artists/edit/:id" element={<EditArtist />} />

          <Route path="/songs" element={<AllSongs />} />
          <Route path="/songs/new" element={<NewSong />} />
          <Route path="/songs/edit/:id" element={<EditSong />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
