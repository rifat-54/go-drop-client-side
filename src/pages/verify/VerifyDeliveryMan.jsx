import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const VerifyDeliveryMan = () => {

    const axiosSecure=useAxiosSecure();
    const {user}=useAuth()
    const navigate=useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    // handle form submission here
    const phone=e.target.phone.value;
    const userAddress=e.target.useraddress.value;
    const age=e.target.age.value;

    console.log(phone,userAddress,age);
    const info={
        phone,userAddress,age,
        email:user?.email
    }

    // send to server 

    try {
        const {data}=await axiosSecure.post('/apply-deliveryman-status',info);

       
        if(data.modifiedCount){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Wait to response",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/dashboard')
        }
    } catch (error) {
        
    }

  };

  return (
    <div className="max-w-md mt-10 bg-white mx-auto p-2 sm:p-5 md:p-10 rounded">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Phone Number</span>
          </label>
          <input
          name="phone"
            type="tel"
            placeholder="Enter your phone number"
            className="input bg-gray-50 input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Address</span>
          </label>
          <textarea
          name="useraddress"
            placeholder="Enter your address"
            className="textarea bg-gray-50 textarea-bordered w-full"
            rows={3}
            required
          ></textarea>
        </div>

        <div className="form-control ">
          <label className="label">
            <span className="label-text font-medium">Age</span>
          </label>
          <input
          name="age"
            type="number"
            placeholder="Enter your age"
            className="input bg-gray-50 input-bordered w-full"
            min="1"
            max="120"
            required
          />
        </div>

        <button type="submit" className="btn bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white   w-full">
          Verify Now
        </button>
      </form>
    </div>
  );
};

export default VerifyDeliveryMan;
