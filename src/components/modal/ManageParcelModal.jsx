import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageParcelModal = ({ handleOpenModal,parcelid,refetch }) => {
  const axiosSecure = useAxiosSecure();

  // get all verified delivery man

  const { data: allDeliveryMan = [] } = useQuery({
    queryKey: ["allDeliveryMan"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-verified-deliveryman");
      return data;
    },
  });

  // console.log(allDeliveryMan);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const date = e.target.ApproximateDate.value;
    const deliveryMan = e.target.deliveryMan.value;
    const [id,name,phone,email]=deliveryMan.split(',');
    // console.log(id,name,phone);

    // send data to database

    const info={
        approximatedate:date,
        name,
        phone,
        id,
        DeliveryManEmail:email
    }

    try {
      const {data}=await axiosSecure.patch(`/assign-parcel-deliveryman/${parcelid}`,info)
      // console.log(data);
      if(data.modifiedCount){
        toast.success('Successfully Assigned');
        refetch()
        handleOpenModal();
      }
    } catch (error) {
      
    }


  };

  return (
    <div className="z-40 w-full md:px-2 md:w-4/6 bg-white rounded-md  ">
      <form onSubmit={handleSubmit} className="px-10 from py-10">
        <div>
          <label className="block my-2 font-semibold">
            Approximate delivery date
          </label>
          <input
            type="date"
            name="ApproximateDate"
            className="w-full border rounded bg-gray-100 p-2"
            required
          />
        </div>
        <div className="mt-3">
          <label className="block my-2 font-semibold">
            Select Delivery Man
          </label>
          <select
            defaultValue={""}
            required={true}
            type="text"
            name="deliveryMan"
            placeholder="select"
            className="input input-bordered w-full bg-white/20 text-black placeholder-white/80"
          >
            <option disabled className=" bg-gray-300 text-black " value="">
              Select Delivery Man
            </option>
            {allDeliveryMan.map((man,index)=>(
              <option key={index} className=" bg-white/20 text-black " value={`${man?._id},${man.name},${man?.phone},${man?.email}`}>
              {man?.name}
            </option>
            ))}
            
          </select>
        </div>

              <div className="flex mt-8 gap-16 items-center justify-center">

             
        <button
          type="submit"
          className="btn  bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white"
        >
          Assign
        </button>
        <button onClick={handleOpenModal} className="btn btn-outline">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ManageParcelModal;
