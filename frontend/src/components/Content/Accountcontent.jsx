import React from 'react';
import {
  LogOut, Moon, Lock, Film, Music, Heart,
  List, BarChart2, Globe
} from 'lucide-react';

const Accountcontent = () => {
    const email = localStorage.getItem('userEmail');
    const username = email ? email.split('@')[0] : 'User';
  
  return (
    <section className="bg-black text-white min-h-screen py-10 px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center text-center space-y-4">
          <img
            src="/images/profile.jpg"
            alt="Profile"
            className="h-20 w-20 rounded-full border-2 border-white object-cover"
          />
          <div>
          <p className="text-2xl font-bold">{username}</p>
          <p className="text-gray-400 text-sm break-all">{email}</p>
          </div>
          <button className="text-blue-400 hover:underline">Edit</button>
        </div>

        {/* Option Cards */}
        <div className="flex flex-col gap-4">
          {[
            { icon: <Music className="text-blue-400" />, label: "My Music Preferences" },
            { icon: <Film className="text-purple-400" />, label: "My Movie Preferences" },
            { icon: <Heart className="text-pink-400" />, label: "Liked Songs & Movies" },
            { icon: <List className="text-yellow-300" />, label: "Watchlist" },
            { icon: <BarChart2 className="text-cyan-400" />, label: "Stats" },
            { icon: <Moon className="text-indigo-400" />, label: "Toggle Dark Mode" },
            { icon: <Globe className="text-green-400" />, label: "Language Settings" },
            { icon: <Lock className="text-orange-400" />, label: "Change Password" },
            { icon: <LogOut className="text-red-500" />, label: "Logout", logout: true }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`w-full bg-gray-900 p-4 rounded-lg shadow-md flex items-center gap-4 cursor-pointer hover:bg-gray-800 transition-all ${
                item.logout ? "text-red-500 font-semibold" : ""
              }`}
            >
              {item.icon}
              <span className="text-base">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accountcontent;
