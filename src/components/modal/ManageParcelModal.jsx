import React, { useState } from "react";

const ManageParcelModal = ({ handleOpenModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = e.target.ApproximateDate.value;
    const deliveryMan = e.target.deliveryMan.value;

    console.log(date, deliveryMan);
  };

  return (
    <div className="z-40 w-4/6  border-red-500 bg-white rounded-md  ">
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

            <option className=" bg-white/20 text-black " value="User">
              James
            </option>

            <option className=" bg-white/20 text-black " value="Delivery Man">
              Sophis
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="btn w-full mt-8 bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white"
        >
          Assign
        </button>
      </form>
    </div>
  );
};

export default ManageParcelModal;
