import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Moviegenre = () => {
  const { genreId } = useParams();
  const location = useLocation();
  const { genreName } = location.state || {};
  const [genreMovie, setGenreMovie] = useState([]);

  const MOVIES_API = import.meta.env.VITE_MOVIES_API;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const genreIdToNameMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
    10759: 'Action & Adventure',
    10762: 'Kids',
    10763: 'News',
    10764: 'Reality',
    10765: 'Sci-Fi & Fantasy',
    10766: 'Soap',
    10767: 'Talk',
    10768: 'War & Politics'
  };
  

  const fallbackGenreName = genreIdToNameMap[genreId] || 'Genre';

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const url = `${MOVIES_API}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('DATA NOT RECEIVED');

        const data = await response.json();
        setGenreMovie(data.results);
      } catch (error) {
        console.error('Error fetching movie genres:', error);
      }
    };

    fetchGenres();
  }, [MOVIES_API, API_KEY, genreId]);

  return (
    <section className="p-8 bg-black min-h-screen">
      <span className="text-2xl font-semibold mb-6 block text-white">
        {genreName || fallbackGenreName}
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {genreMovie.map((movie, index) => (
          <div
            key={index}
            className="bg-zinc-900 text-white rounded-lg shadow-md p-4 hover:shadow-lg hover:shadow-white/10 transition"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.original_title}
              className="w-full h-[250px] object-cover rounded-md"
            />
            <h3 className="mt-3 font-bold text-lg">{movie.original_title}</h3>
            <p className="text-sm text-gray-300 mt-2 line-clamp-3">
              {movie.overview}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Moviegenre;
