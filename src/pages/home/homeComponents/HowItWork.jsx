import React from 'react';
import { FaBoxOpen, FaUserCheck, FaTruckMoving } from 'react-icons/fa';

const HowItWork = () => {
   


  const steps = [
    {
      icon: <FaBoxOpen className="text-4xl text-primary" />,
      title: 'Book a Parcel',
      description: 'Fill in the delivery details and book your parcel easily.',
    },
    {
      icon: <FaUserCheck className="text-4xl text-primary" />,
      title: 'Admin Assigns Delivery',
      description: 'Our admin assigns the best delivery person for your parcel.',
    },
    {
      icon: <FaTruckMoving className="text-4xl text-primary" />,
      title: 'Delivered Safely',
      description: 'Your parcel is delivered quickly and safely to the destination.',
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps?.map((step, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">{step?.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step?.title}</h3>
              <p className="text-gray-500">{step?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

};

export default HowItWork;