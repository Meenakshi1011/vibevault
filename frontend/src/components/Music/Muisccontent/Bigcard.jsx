import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Bigcard = () => {
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

  const handleMouseEnter = (event) => {
    // Unmute the video on hover and start playing
    const videoElement = event.currentTarget.querySelector('video');
    if (videoElement) {
      videoElement.muted = false;
      videoElement.play();
    }
  };

  const handleMouseLeave = (event) => {
    // Keep the video playing but mute it when hover leaves
    const videoElement = event.currentTarget.querySelector('video');
    if (videoElement) {
      videoElement.muted = true;
      // Video continues playing
    }
  };

  return (
    <div className="px-6 py-12 sm:px-10 lg:px-24 bg-black min-h-screen">
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
        {albums.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-black"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {item.clip && (
              <div className="video-container w-full h-full">
                <video
                  autoPlay
                  muted // Default muted
                  loop
                  className="w-full h-full object-cover"
                >
                  <source src={item.clip} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            <div className="absolute top-0 left-0 z-10 p-4 bg-gradient-to-b from-black/70 to-transparent w-full flex items-center gap-4">
              <img
                src={
                  item.image?.find((img) => img.size === "extralarge")?.["#text"] ||
                  ""
                }
                alt="artist"
                className="w-14 h-14 rounded-full object-cover border-2 border-white"
              />
              <div className="text-white">
                <p className="text-lg font-semibold leading-tight">{item.artist}</p>
                <p className="text-sm opacity-80">{item.name}</p>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 z-10 p-4 bg-gradient-to-b from-black/70 to-transparent w-full flex items-center gap-4">
            <Link to={`/songs/${item.name}`} key={index} className="transition transform hover:scale-105">

              <button className="bg-white text-black px-4 py-2 rounded-lg">
                Listen now
              </button>
            </Link>
            </div>
          </div>
        ))}

        {error && (
          <div className="col-span-2 p-4 text-red-500 text-center">{error}</div>
        )}
      </div>
    </div>
  );
};

export default Bigcard;
