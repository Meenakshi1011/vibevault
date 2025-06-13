import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import Detail from './Detail';

const Card = ({ title, genre }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const [dialogbox, setDialogbox] = useState(null);

  const MOVIES_API = import.meta.env.VITE_MOVIES_API;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 500;
    }
  };

  useEffect(() => {
    const url = `${MOVIES_API}/movie/${genre}?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setError('Failed to fetch movies');
        setLoading(false);
      });
  }, [MOVIES_API, API_KEY, genre]);

  return (
    <section className="px-10 py-10 bg-black text-white">
      <h2 className=" text-xs lg:text-3xl font-semibold mb-6">{title}</h2>

      {loading ? (
        <div className="py-4 text-center">Loading...</div>
      ) : error ? (
        <div className="py-4 text-center text-red-400">{error}</div>
      ) : (
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <div className="absolute left-0 z-10 h-full flex items-center bg-gradient-to-r from-black via-black/60 to-transparent pr-2">
            <Icons.ArrowLeft
              size={20}
              onClick={slideLeft}
              className="cursor-pointer hover:scale-110 transition-transform bg-white text-black rounded-full p-1 shadow-md"
            />
          </div>

          {/* Movie List */}
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory scrollbar-hide px-12"
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex-shrink-0 w-[100px] h-[150px] lg:w-[200px] lg:h-[300px] bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform snap-start"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                  className="h-2/3 w-full object-cover cursor-pointer"
                  onClick={() => setDialogbox(movie)}
                />
                <div className="p-3 h-1/3 flex items-center justify-center text-center">
                  <p className="lg:text-base  text-xs font-semibold truncate">{movie.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <div className="absolute right-0 z-10 h-full flex items-center bg-gradient-to-l from-black via-black/60 to-transparent pl-2">
            <Icons.ArrowRight
              size={20}
              onClick={slideRight}
              className="cursor-pointer hover:scale-110 transition-transform bg-white text-black rounded-full p-1 shadow-md"
            />
          </div>
        </div>
      )}

      {/* Dialog Box */}
      {dialogbox && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <Detail movie={dialogbox} onClose={() => setDialogbox(null)} />
        </div>
      )}
    </section>
  );
};

export default Card;
