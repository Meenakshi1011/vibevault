import React from 'react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

const Appfooter = () => {
  return (
    <section>
      <div className='pl-[50px] pr-[50px] pt-[10px] pb-[5px] bg-black h-[65px] w-full'>
        <ul className='text-white flex justify-between items-center'>
          <Link to="/movies">
            <li className='flex flex-col items-center gap-1'>
              <Icons.Clapperboard size={30} />
              <span className='text-sm'>Movies</span>
            </li>
          </Link>
          <Link to="/music">
            <li className='flex flex-col items-center gap-1'>
              <img 
                src="/icons/music.png" 
                alt="music icon" 
                className='h-[30px] w-[30px]' 
              />
              <span className='text-sm'>Music</span>
            </li>
          </Link>
          <Link to="/downloads">
            <li className='flex flex-col items-center gap-1'>
              <Icons.Download size={30} />
              <span className='text-sm'>Download</span>
            </li>
          </Link>
          <Link to="/user">
            <li className='flex flex-col items-center gap-1'>
              <Icons.UserPen size={30} />
              <span className='text-sm'>Account</span>
            </li>
          </Link>
        </ul>
      </div>
    </section>
  );
}

export default Appfooter;
