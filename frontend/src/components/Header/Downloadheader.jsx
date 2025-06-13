import React, { useState} from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Downloadheader = ({title}) => {
  const [searchText, setSearchText] = useState('');

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
          <li className='cursor-pointer'>Movies</li>
          <li className='cursor-pointer'>TV Shows</li>
        </ul>
      </header>


    </>
  );
};

export default Downloadheader;
