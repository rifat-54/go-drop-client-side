import React from "react";
import CountUp from "react-countup";
import { FaBox, FaCheckCircle, FaUsers } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Stats = ({title=true}) => {
  const axiosPublic = useAxiosPublic();

  const { data: statsdata = [], isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axiosPublic("/stats");
      return data;
    },
  });

  // console.log(statsdata);

  const stats = {
    booked: statsdata?.totalBooked || 18425,
    delivered: statsdata?.totalDelivered || 17630,
    users: statsdata?.totalUser || 9420,
  };

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {
          title && <h2 className="text-3xl font-bold text-gray-900 mb-16">
          Our Impact in Numbers
        </h2>
        }

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Parcels Booked */}
          <div className="bg-gray-50 hover:transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 p-6 rounded-2xl shadow text-center">
            <FaBox className="text-indigo-600 text-4xl mx-auto mb-2" />
            <h3 className="text-xl font-semibold text-gray-800">
              Parcels Booked
            </h3>
            <p className="text-3xl font-bold text-indigo-700 mt-2">
              <CountUp end={stats.booked} duration={4} separator="," />
            </p>
          </div>

          {/* Parcels Delivered */}
          <div className="bg-gray-50 p-6 hover:transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 rounded-2xl shadow text-center">
            <FaCheckCircle className="text-green-600 text-4xl mx-auto mb-2" />
            <h3 className="text-xl font-semibold text-gray-800">
              Parcels Delivered
            </h3>
            <p className="text-3xl font-bold text-green-700 mt-2">
              <CountUp end={stats.delivered} duration={5} separator="," />
            </p>
          </div>

          {/* Users */}
          <div className="bg-gray-50 hover:transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 p-6 rounded-2xl shadow text-center">
            <FaUsers className="text-yellow-500 text-4xl mx-auto mb-2" />
            <h3 className="text-xl font-semibold text-gray-800">
              Registered Users
            </h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              <CountUp end={stats.users} duration={6} separator="," />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
