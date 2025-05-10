import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from './../hooks/useAxiosSecure';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const BookParcel = () => {
  const { user } = useAuth();
  
  const axiosSecure=useAxiosSecure()
  const [price,setPrice]=useState(0)
  const navigate=useNavigate()


  const [formData, setFormData] = useState({
    phone: "",
    parcelType: "",
    parcelWeight: "",
    receiverName: "",
    receiverPhone: "",
    deliveryAddress: "",
    deliveryDate: "",
    latitude: "",
    longitude: "",
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // calculate price useing weight
    if(name==='parcelWeight'){
        let num=parseInt(value)
       
        let total=0;

       
        if(num<=1){
            total=50;
        }else if(num>1 && num<=2){
            total=100;
        }else{
            total=150;
        }

        setPrice(total)
       


        
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const parcelDetails = {
      name: user?.displayName,
      email: user?.email,
      price,
      ...formData,
    };
    console.log("Parcel Booking Submitted:", parcelDetails);

    // Submit to backend here

    try {
      const {data}=await axiosSecure.post('/book-parcel',parcelDetails)
     
      if(data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Booked a Parcel",
          showConfirmButton: false,
          timer: 1500
        });

        navigate('/dashboard/my-parcel');
        
      }
      

    } catch (error) {
      
    }
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
            type="text"
            name="phone"
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Parcel Type */}
        <div>
          <label className="block font-semibold">Parcel Type</label>
          <input
            type="text"
            name="parcelType"
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Parcel Weight */}
        <div>
          <label className="block font-semibold">Parcel Weight (kg)</label>
          <input
            type="number"
            name="parcelWeight"
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Receiver’s Name */}
        <div>
          <label className="block font-semibold">Receiver’s Name</label>
          <input
            type="text"
            name="receiverName"
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Receiver's Phone */}
        <div>
          <label className="block font-semibold">Receiver's Phone Number</label>
          <input
            type="text"
            name="receiverPhone"
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block font-semibold">Parcel Delivery Address</label>
          <textarea
            name="deliveryAddress"
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={3}
            required
          ></textarea>
        </div>

        {/* Delivery Date */}
        <div>
          <label className="block font-semibold">Requested Delivery Date</label>
          <input
            type="date"
            name="deliveryDate"
            onChange={handleChange}
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
            type="number"
            name="latitude"
            onChange={handleChange}
            step="any"
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
            type="number"
            name="longitude"
            onChange={handleChange}
            step="any"
            className="w-full border rounded p-2"
            required
          />
        </div>
        {/* price */}

        <div>
          <label className="block font-semibold">
            Price
          </label>
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
          Book Parcel
        </button>
      </form>
    </div>
  );
};

export default BookParcel;
