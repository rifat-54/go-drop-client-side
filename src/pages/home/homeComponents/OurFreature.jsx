import { MapPin, ShieldCheck, Zap } from 'lucide-react';
import React from 'react';

const OurFreature = () => {
    const features = [
        {
          icon: <ShieldCheck className="h-10 w-10 text-indigo-600" />,
          title: "Parcel Safety",
          description: "Your packages are protected with top-tier security from pickup to delivery.",
        },
        {
          icon: <Zap className="h-10 w-10 text-indigo-600" />,
          title: "Super Fast Delivery",
          description: "Lightning-speed delivery services to get your parcel delivered in record time.",
        },
        {
          icon: <MapPin className="h-10 w-10 text-indigo-600" />,
          title: "Live Tracking",
          description: "Track your parcel in real time and stay updated every step of the way.",
        },
      ];


    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Features</h2>
            <p className="mt-4 text-lg text-gray-600">
              We ensure every parcel reaches safely, quickly, and reliably.
            </p>
    
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 hover:transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 rounded-2xl p-6 shadow hover:shadow-md transition"
                >
                  <div className="flex items-center justify-center mb-4">
                    {feature.icon} 
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
};

export default OurFreature;