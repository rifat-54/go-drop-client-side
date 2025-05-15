import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/ShareComponents/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const UpdateParcel = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState("");

  const navigate = useNavigate();

  // get data from database
  const { data: parcel = [], isLoading } = useQuery({
    queryKey: ["parcel"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/parcel-data/${id}`);
      return data;
    },
  });

  //   if (isLoading) {
  //     return <LoadingSpinner></LoadingSpinner>;
  //   }

  useEffect(() => {
    if (parcel?.parcelWeight) {
      setWeight(parcel?.parcelWeight);
    }
  }, [parcel]);

  useEffect(() => {
    const num = parseInt(weight);
    if (isNaN(num)) return;

    let total = 0;

    if (num <= 1) {
      total = 50;
    } else if (num <= 2) {
      total = 100;
    } else {
      total = 150;
    }
    setPrice(total);
  }, [weight]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const phone = form.phone.value;
    const parcelType = form.parcelType.value;
    const receiverName = form.receiverName.value;
    const receiverPhone = form.receiverPhone.value;
    const deliveryAddress = form.deliveryAddress.value;
    const deliveryDate = form.deliveryDate.value;
    const latitude = form.latitude.value;
    const longitude = form.longitude.value;

    const parcelDetails = {
      name: user?.displayName,
      email: user?.email,
      phone,
      price,
      parcelType,
      parcelWeight: weight,
      receiverName,
      receiverPhone,
      deliveryAddress,
      deliveryDate,
      latitude,
      longitude,
    };
    // console.log("Parcel Booking Submitted:", parcelDetails);

    // price,
    // Submit to backend here

    try {
      const { data } = await axiosSecure.patch(
        `/update-parcel/${id}`,
        parcelDetails
      );

      if (data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Updated Parcel",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/dashboard/my-parcel");
        
      }
    } catch (error) {}
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Book a Parcel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold">Phone Number</label>
          <input
            defaultValue={parcel?.phone}
            type="text"
            name="phone"
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Parcel Type */}
        <div>
          <label className="block font-semibold">Parcel Type</label>
          <input
            defaultValue={parcel?.parcelType}
            type="text"
            name="parcelType"
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Parcel Weight */}
        <div>
          <label className="block font-semibold">Parcel Weight (kg)</label>
          <input
            value={weight}
            type="number"
            name="parcelWeight"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setWeight(""); // Allow clearing
              } else {
                setWeight(Number(value));
              }
            }}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Receiver’s Name */}
        <div>
          <label className="block font-semibold">Receiver’s Name</label>
          <input
            defaultValue={parcel?.receiverName}
            type="text"
            name="receiverName"
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Receiver's Phone */}
        <div>
          <label className="block font-semibold">Receiver's Phone Number</label>
          <input
            defaultValue={parcel?.receiverPhone}
            type="text"
            name="receiverPhone"
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block font-semibold">Parcel Delivery Address</label>
          <textarea
            defaultValue={parcel?.deliveryAddress}
            name="deliveryAddress"
            className="w-full border rounded p-2"
            rows={3}
            required
          ></textarea>
        </div>

        {/* Delivery Date */}
        <div>
          <label className="block font-semibold">Requested Delivery Date</label>
          <input
            defaultValue={parcel?.deliveryDate}
            type="date"
            name="deliveryDate"
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Latitude */}
        <div>
          <label className="block font-semibold">
            Delivery Address Latitude
          </label>
          <input
            defaultValue={parcel?.latitude}
            type="number"
            name="latitude"
            // step="any"
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Longitude */}
        <div>
          <label className="block font-semibold">
            Delivery Address Longitude
          </label>
          <input
            defaultValue={parcel?.longitude}
            type="number"
            name="longitude"
            step="any"
            className="w-full border rounded p-2"
            required
          />
        </div>
        {/* price */}

        <div>
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={price}
            // onChange={handleChange}

            className="w-full border rounded p-2 bg-slate-100 cursor-not-allowed"
            readOnly
          />
        </div>

        <button className="btn bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white w-full ">
          Update Parcel
        </button>
      </form>
    </div>
  );
};

export default UpdateParcel;
