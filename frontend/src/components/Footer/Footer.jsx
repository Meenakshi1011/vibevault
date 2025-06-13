import React from 'react';

const Footer = () => {
  return (
    <footer className='pt-[5%] pr-[5%] pl-[5%] bg-black text-white'>
        
        {/* Logo & Description */}
        <div className='flex flex-col gap-2 items-center justify-center'>
          <img src="/images/logo.png" alt="logo" className='h-[30px] w-[100px] items-center' />
          <p className='text-gray-400 text-center'>
            "Your ultimate streaming destination. Movies. Music. Anytime."
          </p>
        </div>

        {/* Quick Links */}
        <div className='grid grid-cols-3 mt-[30px] justify-between w-full '>
        <div>
          <h3 className='font-semibold mb-2'>Quick Links</h3>
          <ul className='space-y-1 text-gray-400'>
            <li className='hover:text-red-500 cursor-pointer'>Home</li>
            <li className='hover:text-red-500 cursor-pointer'>Movies</li>
            <li className='hover:text-red-500 cursor-pointer'>Music</li>
            <li className='hover:text-red-500 cursor-pointer'>Pricing</li>
            <li className='hover:text-red-500 cursor-pointer'>FAQ</li>
            <li className='hover:text-red-500 cursor-pointer'>Contact Us</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className='font-semibold mb-2'>Legal</h3>
          <ul className='space-y-1 text-gray-400'>
            <li className='hover:text-red-500 cursor-pointer'>Privacy Policy</li>
            <li className='hover:text-red-500 cursor-pointer'>Terms of Service</li>
            <li className='hover:text-red-500 cursor-pointer'>Cookie Preferences</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className='font-semibold mb-2'>Follow Us</h3>
          <ul className='space-y-1 text-gray-400'>
            <li className='hover:text-red-500 cursor-pointer'>Instagram</li>
            <li className='hover:text-red-500 cursor-pointer'>Twitter</li>
            <li className='hover:text-red-500 cursor-pointer'>YouTube</li>
            <li className='hover:text-red-500 cursor-pointer'>LinkedIn</li>
          </ul>
        </div>

      </div>
        
      
      {/* Footer Bottom Text */}
      <p className='text-center text-gray-500 text-sm mt-6'>
        © 2025 VibeVault, Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
