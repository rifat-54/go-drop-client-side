// Testimonials.jsx
import { FaStar } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./testimonial.css";

// import required modules
import { Navigation } from "swiper/modules";
import LoadingSpinner from './../../../components/ShareComponents/LoadingSpinner';

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const { data: testimonial, isLoading } = useQuery({
    queryKey: ["testimonial"],
    queryFn: async () => {
      const { data } = await axiosPublic("/top-testimonials");
      return data;
    },
  });

    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>

        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {/* <SwiperSlide>Slide 2</SwiperSlide> */}
          {testimonial?.map((user, index) => (
            <SwiperSlide key={index}>
              <div
                key={index}
                className="card w-full mx-auto max-w-3xl bg-base-200 shadow-lg p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="avatar mb-4">
                  <div className="w-20 rounded-full mx-auto">
                    <img
                      referrerPolicy="no-referrer"
                      src={user?.photo}
                      alt={user?.userName}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{user?.userName}</h3>
                <p className="text-sm text-gray-600 mt-2 mb-3">
                  {user?.feedback}
                </p>

                <div className="flex justify-center text-yellow-400">
                  {[...Array(parseInt(user?.rating) || 0)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
