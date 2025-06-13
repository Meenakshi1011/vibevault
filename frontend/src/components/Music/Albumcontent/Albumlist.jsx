import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';

// Like Button as a separate component
const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
        isLiked ? 'bg-red-500 text-white' : 'bg-gray-800 text-red-400 hover:bg-gray-700'
      }`}
    >
      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-white' : ''}`} />
      {isLiked ? 'Liked' : 'Like'}
    </button>
  );
};

const Albumlist = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { albumName } = useParams();
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/top-tracks/`);
        if (!response.ok) throw new Error("Failed to fetch album data");
        const data = await response.json();

        const filtered = data.filter(album => album.name === albumName);
        setTracks(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [API_URL, albumName]);

  return (
    <section className="bg-black text-white min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {isLoading && <p className="text-lg text-white">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {tracks.length > 0 ? (
          tracks.map((album, index) => (
            <div key={index} className="mb-10">
              {/* Album Header */}
              <div className="mb-8 flex items-center gap-6">
                <img
                  src={album.image?.find(img => img.size === 'extralarge')?.['#text'] || ''}
                  alt={`${album.artist} cover`}
                  className="w-28 h-28 object-cover rounded-xl shadow-lg border-2 border-white"
                />
                <h1 className="text-3xl font-extrabold">{albumName}'s Top Tracks</h1>
              </div>

              {/* Track List */}
              <div className="space-y-4">
                {album.tracks?.track?.map((track, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-900 rounded-xl shadow hover:bg-gray-800 transition-all duration-200 flex items-center justify-between"
                  >
                    <div>
                      <h2 className="text-xl font-semibold text-white">{track.name}</h2>
                      <p className="text-sm text-gray-400">{track.artist?.name}</p>
                      <p className="text-sm text-gray-500">Rank: {track['@attr']?.rank}</p>
                    </div>
                    <div className="flex flex-row items-end gap-6">
                      <LikeButton />
                      <button className="text-green-400 hover:text-green-300 hover:underline text-sm">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          !isLoading && <p className="text-gray-400 text-center">No tracks found for this album.</p>
        )}
      </div>
    </section>
  );
};

export default Albumlist;
