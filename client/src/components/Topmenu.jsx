import React from 'react';
import { Link } from 'react-router-dom';

function Topmenu(props) {
  return (
    <nav className="w-full flex justify-end gap-4 p-4 bg-slate-200">
      <Link to='/artists'>
        <button className="btn-menu">Все исполнители</button>
      </Link>
      <Link to='/songs'>
        <button className="btn-menu">Все композиции</button>
      </Link>
      <div className="grow"></div>
      <Link to='/artists/new'>
        <button className="btn-menu">Добавить исполнителя</button>
      </Link>
      <Link to='/songs/new'>
        <button className="btn-menu">Добавить композицию</button>
      </Link>
    </nav>
  );
}

export default Topmenu;
