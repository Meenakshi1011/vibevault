import React from 'react'
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='hero-section'>
        <div className=' h-[100vh] w-full flex justify-center items-center '>
            <div className='bg-black bg-opacity-50 text-white h-[300px] w-[500px] border-solid border-white border-[0.1px] justify-center flex flex-col items-center p-[20px] rounded-lg '>
                <div className='flex-col p-[10px] ' >
                    <p className='text-2xl'>
                        Stream the latest movies <br/>
                        and your favorite music tracks-all in one <br/>
                        seamless, ad-free platform. Anytime, anywhere. <br/>
                    </p>
                    <p className='text-xs'>
                         Ready to watch? Enter your email to create or restart your membership
                    </p>
                </div>
                <div className='flex gap-[20px]'>
                    <input
                        type="email" 
                        name='email' 
                        id='email' 
                        placeholder='Enter Email Address' 
                        className='transition-all text-black duration-200 ease-in-out rounded-md p-[6px] w-[170px] text-xs border border-gray-300 focus:border-pink-500 outline-none' 
                    />

                    <Link to="/signup">
                      <button className="rounded-lg bg-[#32CD32] w-[140px] p-[10px] gap-[10px] flex items-center justify-center text-white">
                        Get Started
                        <Icons.ArrowRight className="ml-2 w-5 h-5" />
                      </button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Hero;
