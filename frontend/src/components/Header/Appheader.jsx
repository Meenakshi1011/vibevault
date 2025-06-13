import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppHeader = ({title}) => {
  const [searchText, setSearchText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuType, setMenuType] = useState('movies');
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);

  const MOVIES_API = import.meta.env.VITE_MOVIES_API;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieGenres = async () => {
      try {
        const response = await fetch(`${MOVIES_API}/genre/movie/list?api_key=${API_KEY}&language=en`);
        const data = await response.json();
        setMovieList(data.genres);
      } catch (error) {
        console.error('Error fetching movie genres:', error);
      }
    };
    fetchMovieGenres();
  }, [MOVIES_API, API_KEY]);

  useEffect(() => {
    const fetchTvGenres = async () => {
      try {
        const response = await fetch(`${MOVIES_API}/genre/tv/list?api_key=${API_KEY}&language=en`);
        const data = await response.json();
        setTvList(data.genres);
      } catch (error) {
        console.error('Error fetching TV genres:', error);
      }
    };
    fetchTvGenres();
  }, [MOVIES_API, API_KEY]);

  const handleOpenMenu = (type) => {
    setMenuType(type);
    setIsMenuOpen(true);
  };

  return (
    <>
      <header className='flex flex-col lg:flex-row justify-between items-center bg-black text-white p-4'>
        {/* Logo (visible only on lg and up) */}
        <div className='hidden lg:block'>
          <img src='/images/logo.png' alt='logo' className='h-[30px] w-auto' />
        </div>

        {/* Search bar */}
        <div className='w-full max-w-lg mt-2 lg:mt-0 flex items-center justify-center border border-gray-600 rounded px-3 py-2'>
          <input
            type='text'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={`Search for ${title}`}
            className='bg-transparent outline-none flex-1 text-white'
          />
          <X className='cursor-pointer' onClick={() => setSearchText('')} />
        </div>

        {/* Nav links */}
        <ul className='flex gap-6 mt-4 lg:mt-0 lg:ml-6 text-lg items-center justify-center'>
          <Link to='/movies'><li className='cursor-pointer'>Home</li></Link>
          <li className='cursor-pointer' onClick={() => handleOpenMenu('movies')}>Movies</li>
          <li className='cursor-pointer' onClick={() => handleOpenMenu('tv')}>TV Shows</li>
        </ul>
      </header>

      {/* Sliding Genre Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] bg-[#111] text-white z-50 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='flex flex-col h-full'>
          <div className='flex justify-between items-center p-4 border-b border-white/20'>
            <h2 className='text-xl font-semibold'>
              {menuType === 'movies' ? 'Movie Categories' : 'TV Show Categories'}
            </h2>
            <X onClick={() => setIsMenuOpen(false)} className='cursor-pointer' />
          </div>

          <div className='flex-1 overflow-y-auto p-4'>
            <ul className='space-y-3'>
              {(menuType === 'movies' ? movieList : tvList).map((genre) => (
                <li key={genre.id} className='text-2xl hover:border-b-2 hover:border-gray-200 cursor-pointer'>
                  <Link to={`/${menuType}-genre-based/${genre.id}`} onClick={() => setIsMenuOpen(false)}>
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Optional Overlay */}
      {isMenuOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40'
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default AppHeader;
