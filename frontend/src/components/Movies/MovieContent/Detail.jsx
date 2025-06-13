import React, { useEffect, useState } from 'react';

const Detail = ({ movie, onClose }) => {
  const [cast, setCast] = useState([]);
  const MOVIES_API = import.meta.env.VITE_MOVIES_API;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const res = await fetch(
          `${MOVIES_API}/${movie.id}/credits?api_key=${API_KEY}`
        );
        const data = await res.json();
        setCast(data.cast.slice(0, 5)); // Show top 5 cast members
      } catch (err) {
        console.error('Error fetching cast:', err);
      }
    };

    if (movie.id) {
      fetchCast();
    }
  }, [movie.id, MOVIES_API, API_KEY]);

  return (
    <div className="bg-gray-900 rounded-xl text-white p-6 w-[80%] max-w-5xl shadow-lg relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-lg font-bold"
      >
        ✕
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg w-64 h-auto"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          <p className="text-sm text-gray-300 mb-4">{movie.overview}</p>

          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400">
            Watch Now
          </button>

          <h3 className="mt-6 text-xl font-semibold">Cast</h3>
          <div className="flex gap-4 mt-2">
            {cast.length > 0 ? (
              cast.map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : 'https://via.placeholder.com/64x64?text=?'
                    }
                    alt={actor.name}
                    className="w-16 h-16 rounded-full object-cover mb-1"
                  />
                  <p className="text-xs">{actor.name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No cast available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
