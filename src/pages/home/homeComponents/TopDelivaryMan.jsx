import React from 'react';

import { FaStar } from 'react-icons/fa';

const TopDelivaryMan = () => {
    const deliveryMen = [
        {
          name: 'Rifat',
          image: 'https://i.ibb.co.com/r29BCVZP/360-F-464021723-EGFU7j-WIHYw-WM5-KEWz-V1-TX7-TD1eq-MQMX.jpg',
          parcelsDelivered: 123,
          avgRating: 4.8,
        },
        {
          name: 'Junaid Ali',
          image: 'https://i.ibb.co.com/ssVq14Q/images-14.jpg',
          parcelsDelivered: 109,
          avgRating: 4.7,
        },
        {
          name: 'Sumaiya Rahman',
          image: 'https://i.ibb.co.com/svBHTK73/download-9.jpg',
          parcelsDelivered: 98,
          avgRating: 4.6,
        },
      ];
      
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-16">Top Delivery Heroes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {deliveryMen.map((man, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md transition-all duration-500 ease-in-out hover:scale-105"
            >
              <img
                src={man.image}
                alt={man.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{man.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Parcels Delivered: <span className="font-bold">{man.parcelsDelivered}</span></p>

              <div className="mt-2 flex justify-center items-center gap-1 text-yellow-400">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(man.avgRating) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">({man.avgRating.toFixed(1)})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

};

export default TopDelivaryMan;