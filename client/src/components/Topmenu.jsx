import React from 'react';
import { Link } from 'react-router-dom';

function Topmenu(props) {
  return (
    <nav className="fixed w-full min-w-[900px] top-0 h-24 flex justify-end items-center gap-4 px-4 bg-slate-200 z-10">
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
