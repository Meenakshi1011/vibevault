import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Musiccontent = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/top-tracks/`);
        if (!response.ok) throw new Error("Data not received");
        const data = await response.json();
        setAlbums(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchItems();
  }, [API_URL]);

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <section className="bg-black text-white py-8 px-6">
      <h2 className="text-3xl font-bold mb-6">🎵 Explore by Album</h2>
      
      {albums.length > 0 ? (
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth">
          <div className="flex gap-6 min-w-fit ">
            {albums.map((item, index) => (
              <Link to={`/songs/${item.name}`} key={index} className="transition transform hover:scale-105">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-4 w-[140px] sm:w-[160px] lg:w-[208px] hover:shadow-2xl duration-300">
              <img
                    src={item.image?.find(img => img.size === 'extralarge')?.['#text'] || ''}
                    alt={`${item.artist} cover`}
                    className="rounded-xl w-full h-[160px] object-cover"
                  />
                  <h3 className="mt-4 text-lg font-semibold truncate">{item.artist}</h3>
                  <p className="text-sm text-gray-400 truncate">{item.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Loading albums...</p>
      )}
    </section>
  );
};

export default Musiccontent;
