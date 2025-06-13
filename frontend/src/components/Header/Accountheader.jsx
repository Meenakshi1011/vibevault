import React, { useState } from 'react'
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

const Accountheader = ({ title }) => {
  const [close, setClose] = useState("");

  const closeButton = () => {
    setClose(""); // Clears the input field
  }

  return (
    <>
      {/* Header */}
      <header>
        <div className='p-[15px] bg-black w-full h-[65px]'>
          <div className='flex flex-row '>
            {/* Logo */}
            <div className=' h-[10px] w-[30px] lg:h-[30px] lg:w-[100px]'>
              <img src="/images/logo.png" alt="logo" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Accountheader;
