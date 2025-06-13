import React from 'react';
import * as Icons from 'lucide-react';
import {useRef} from 'react';

const Features = ({title,data}) => {

  const sliderRef = useRef(null)
  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 500;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 500;
  };

  return (
    <section className='px-[60px] py-[30px] bg-black text-white'>
      <div>
        <div>
          <span className='text-2xl font-semibold'>{title}</span>
          <div className='dropdown'></div>

          <div className='Horizontal-scroll py-[20px] flex items-center gap-[10px]'>
            <Icons.ArrowLeft size={50} onClick={slideLeft} className='cursor-pointer' />
            
            <div
              ref={sliderRef}
              className='flex gap-[20px] overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth'
            >
              {data.map((item) => (
                <img
                    key={item.id}
                    src={item.img}
                    alt='content'
                    className='rounded-md hover:scale-110 transition-transform duration-500 ease' 
                />

              ))}
            </div>

            <Icons.ArrowRight size={50} onClick={slideRight} className='cursor-pointer' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
