import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Topartistsong = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [topArtist, setTopArtist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/top-artist-songs/`);
        if (!response.ok) throw new Error("Data not received");
        const data = await response.json();
        setTopArtist(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchItems();
  }, [API_URL]);

  return (
    <section className="p-5 bg-black text-white">
      <span className="text-2xl font-semibold block mb-4">🎤 Listen By Artist</span>
      
      {error && <div className="text-red-500">{error}</div>}

      {topArtist.length > 0 ? (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 w-max">
            {topArtist.map((artist) => (
              <Link
                key={artist.artist_id}
                to={`/artist/${encodeURIComponent(artist.artist)}`}
              >
                <div className=" w-[140px] sm:w-[160px] lg:w-[208px] p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg hover:shadow-2xl duration-300 text-center flex-shrink-0">
                  <img
                    src={artist.image}
                    alt={artist.artist}
                    className="w-full h-[160px]  object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-lg font-semibold truncate">{artist.artist}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-400">Loading...</div>
      )}
    </section>
  );
};

export default Topartistsong;
