import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./../../components/ShareComponents/LoadingSpinner";
import Stats from "../home/homeComponents/Stats";
dayjs.extend(quarterOfYear);

const Statistics = () => {
  const [state, setState] = useState({
    series: [],
    options: {},
  });

  const axiosSecure = useAxiosSecure();

  const { data: statistics = [], isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure("/statistics");
      return data;
    },
  });

  if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
  }

  const { bookedVsDeliver, bookVsDate } = statistics;

  // console.log(bookVsDate);

 
  // book vs date
  const barChartOptions = {
    chart: {
      type: "bar",
      height: 380,
    },
    xaxis: {
      categories: bookVsDate?.map((item) => item._id),
    },
    title: {
      text: "Bookings by Date",
    },
  };
  const barChartSeries = [
    {
      name: "Bookings",
      data: bookVsDate?.map((item) => item.count),
    },
  ];



  // Booked and Delivered vs date
  const lineChartOptions = {
    chart: {
      type: "line",
      height: 380,
    },
    xaxis: {
      categories: bookedVsDeliver?.map((item) => item._id),
    },
    title: {
      text: "Booked vs Delivered Comparison",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };
  const lineChartSeries = [
    {
      name: "Booked",
      data: bookedVsDeliver?.map((item) => item.booked),
    },
    {
      name: "Delivered",
      data: bookedVsDeliver?.map((item) => item.delivered),
    },
  ];



  return (
    <div>
      <div>
        <Stats title={false}></Stats>
      </div>
      <div className="mt-16">
        <ReactApexChart
          options={barChartOptions}
          series={barChartSeries}
          type="bar"
          height={380}
        />
      </div>

      <div className="mt-16">
        <ReactApexChart
          options={lineChartOptions}
          series={lineChartSeries}
          type="line"
          height={380}
        />
      </div>
    </div>
  );
};

export default Statistics;
