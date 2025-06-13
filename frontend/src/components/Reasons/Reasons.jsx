import React from 'react';
import data from '../../utils/reasons';

const Reasons = () => {
  return (
    <section className="px-[60px] py-[30px] bg-black text-white">
      <h2 className="text-xl font-semibold mb-6">Reasons to Join</h2>

      <div className="grid lg:grid-cols-4 gap-6 ">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-gray-500 p-6  items-center justify-center rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-transparent border-solid border-white border-[0.1px]"
          >
            <p className="text-base text-white">{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reasons;
