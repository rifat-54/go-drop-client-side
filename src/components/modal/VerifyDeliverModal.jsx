import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../ShareComponents/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const VerifyDeliverModal = ({ id, handleModalOpen, refetch }) => {
  //   console.log(id);
  const axiosSecure = useAxiosSecure();

  const { data: deliverman = [], isLoading } = useQuery({
    queryKey: ["deliverman"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/deliverman/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  //   update stauts

  const updateStatus = async () => {
    const { data } = await axiosSecure.patch(
      `/update-deliveryman-status/${id}`
    );

    if (data?.modifiedCount) {
      toast.success("Successfully Updated");
      handleModalOpen();
      refetch();
    }
  };

//   console.log(deliverman);
  return (
    <div className="z-40 w-full md:px-2  md:w-4/6 bg-white rounded-md  ">
      <div className="px-10 space-y-5 from py-10">
        <div>
          <div className="flex items-center justify-center">
            <img
              className="w-24 h-20 rounded-md"
              src={deliverman?.photo}
              alt={deliverman?.name}
            />
          </div>
          <div>
            <p>
              <span className="font-semibold text-xl">Name: </span>{" "}
              {deliverman?.name}
            </p>
            <p>
              <span className="font-semibold text-xl">Email: </span>{" "}
              {deliverman?.email}
            </p>
            <p>
              <span className="font-semibold text-xl">Phone: </span>{" "}
              {deliverman?.phone}
            </p>
            <p>
              <span className="font-semibold text-xl">Age: </span>{" "}
              {deliverman?.age}
            </p>
            <p>
              <span className="font-semibold text-xl">Address: </span>{" "}
              {deliverman?.address}
            </p>
          </div>
        </div>
        <div className="flex mt-12 gap-16 items-center justify-center">
          <button
            disabled={deliverman?.userStatus !== "Pending"}
            onClick={updateStatus}
            type="submit"
            className={`btn
            ${
              deliverman?.userStatus === "Pending"
                ? "bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white"
                : "text-black cursor-not-allowed "
            }
            `}
          >
            Verify Now
          </button>
          <button onClick={handleModalOpen} className="btn btn-outline">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyDeliverModal;
