import React, { useState } from 'react';
import * as Icons from 'lucide-react';

const Songheader = ({ title }) => {
  const [close, setClose] = useState('');

  function closeButton() {
    setClose('');
  }

  return (
    <header>
      {/* The header container: flex, and it will wrap its content on small screens */}
      <div className='p-[15px] bg-black w-full h-[65px] flex items-center flex-wrap'>
        
        {/* Logo on the left */}
        <div className='h-[30px] w-[100px]'>
          <img src='/images/logo.png' alt='logo' />
        </div>

        {/* Search Bar at the center */}
        {/* Flex-grow allows this to take available space */}
        <div className='flex-grow flex justify-center mt-2 sm:mt-0'>
          <div className='search text-base flex items-center justify-between p-[5px] w-[90%] sm:w-[600px] rounded-lg focus:outline-none border-2 border-solid border-white/40 bg-transparent text-white'>
            <input
              type='text'
              id='search'
              name='search'
              placeholder={`Search for ${title}`}
              value={close}
              onChange={(e) => setClose(e.target.value)}
              className='focus:outline-none p-[5px] bg-transparent text-white'
            />
            <Icons.X className='text-white cursor-pointer' onClick={closeButton} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Songheader;
