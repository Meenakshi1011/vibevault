import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart } from 'lucide-react';

const ArtistTracks = () => {
  const { artist } = useParams();
  const API_URL = "http://127.0.0.1:8000/api";

  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [artistName, setArtistName] = useState("");
  const [artistImage, setArtistImage] = useState("");
  const [likedTracks, setLikedTracks] = useState({}); // Track which songs are liked

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/top-artist-songs/?artist=${artist}`);
        if (!response.ok) throw new Error("Failed to fetch artist data");
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const artistData = data[0];
          setTracks(artistData.tracks || []);
          setArtistName(artistData.artist || "");
          setArtistImage(artistData.image || "");
        } else {
          setTracks([]);
          setArtistName("");
          setArtistImage("");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [API_URL, artist]);

  const handleLike = (trackName) => {
    setLikedTracks(prev => ({
      ...prev,
      [trackName]: !prev[trackName]
    }));
  };

  return (
    <section className="bg-black">
      <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen text-white">
        {isLoading && <p className="text-lg text-gray-400">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!isLoading && artistName && (
          <div className="mb-8 flex items-center gap-4">
            <img
              src={artistImage}
              alt={artistName}
              className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-white"
            />
            <h1 className="text-3xl font-extrabold">{artistName}'s Top Tracks</h1>
          </div>
        )}

        {!isLoading && tracks.length > 0 && (
          <div className="space-y-4">
            {tracks.map((track, index) => (
              <div
                key={index}
                className="p-4 bg-gray-900 rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white">{track.track_name}</h2>
                  <p className="text-sm text-gray-400">👥 Listeners: {track.listeners}</p>
                  <p className="text-sm text-gray-400">▶️ Playcount: {track.playcount}</p>
                </div>
                <div className="flex flex-row items-end gap-6">
                  <button
                    onClick={() => handleLike(track.track_name)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                      likedTracks[track.track_name]
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-800 text-red-400 hover:bg-gray-700'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedTracks[track.track_name] ? 'fill-current text-white' : ''
                      }`}
                    />
                    {likedTracks[track.track_name] ? 'Liked' : 'Like'}
                  </button>

                  <a
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 hover:underline text-sm"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && tracks.length === 0 && (
          <p className="text-gray-400 mt-8">No tracks found for this artist.</p>
        )}
      </div>
    </section>
  );
};

export default ArtistTracks;
