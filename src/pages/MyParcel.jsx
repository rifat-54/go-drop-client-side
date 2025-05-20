import React, { useState } from "react";
import useAuth from "./../hooks/useAuth";
import useAxiosSecure from "./../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./../components/ShareComponents/LoadingSpinner";
import RevewModal from "../components/modal/RevewModal";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Pagenation from "../components/ShareComponents/Pagenation";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [id, setId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, returnData] = useState([]);

  const {
    data: myParcel = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcel"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-parcel/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // console.log(myParcel);

  const getDateFrom_id = (id) => {
    return new Date(
      parseInt(id.substring(0, 8), 16) * 1000
    ).toLocaleDateString();
  };

  // console.log(myParcel);

  // handel modal
  const handleModalOpen = (id) => {
    setModalOpen(!modalOpen);
    setId(id);
  };

  //   handleCancel

  const handleCancel = async (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.patch(
            `/update-delivery-status/${id}`
          );

          if (data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Cencelled!",
              text: "Delivery has been Cancelled.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {}
      }
    });
  };

  return (
    <div className="relative ">
      <h2 className="text-2xl text-center mt-6 font-bold mb-4">My Parcels</h2>
      <div className={`overflow-x-auto p-4 ${modalOpen && "blur-md"}`}>
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-10 py-2">Parcel Type</th>
              <th className="border px-10 py-2">Requested Delivery Date</th>
              <th className="border px-10 py-2">Approx. Delivery Date</th>
              <th className="border px-10 py-2">Booking Date</th>
              <th className="border px-10 py-2">Delivery Man ID</th>
              <th className="border px-10 py-2">Status</th>
              <th className="border px-10 py-2">Update</th>
              <th className="border px-10 py-2">Cancel</th>
              <th className="border px-10 py-2">Review</th>
              <th className="border px-10 py-2">Pay</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((parcel, index) => (
              <tr
                key={parcel._id}
                className={` ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <td className="px-6 py-3">{parcel?.parcelType}</td>
                <td className="px-6 py-3">{parcel?.deliveryDate}</td>
                <td className="px-6 py-3">
                  {parcel?.deliveryMan?.approximatedate}
                </td>
                <td className="px-6 py-3">{getDateFrom_id(parcel?._id)}</td>
                <td className="px-6 py-3">
                  {parcel?.deliveryMan?.id || "Not Assigned"}
                </td>

                {/* Status with color */}
                <td className="px-6 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 block rounded font-semibold ${
                      parcel?.status === "Pending"
                        ? "text-yellow-500"
                        : parcel?.status === "On The Way"
                        ? "text-blue-500"
                        : parcel?.status === "Delivered"
                        ? "text-green-600"
                        : parcel?.status === "returned"
                        ? "text-purple-500"
                        : parcel?.status === "Cancelled"
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {parcel?.status}
                  </span>
                </td>

                {/* Update button */}
                <td className="px-6 py-3">
                  <Link
                    to={`/dashboard/update-parcel/${parcel._id}`}
                    disabled={parcel.status !== "Pending"}
                    onClick={() => handleUpdate(parcel._id)}
                    className={`px-2 py-1 rounded ${
                      parcel.status === "Pending"
                        ? "bg-indigo-500 text-white hover:bg-indigo-600"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Update
                  </Link>
                </td>

                {/* Cancel button */}
                <td className="px-6 py-3">
                  <button
                    disabled={parcel.status !== "Pending"}
                    onClick={() => handleCancel(parcel?._id)}
                    className={`px-2 py-1 rounded ${
                      parcel.status === "Pending"
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Cancel
                  </button>
                </td>

                {/* Review button */}
                <td className="px-6 py-3">
                  {parcel.status === "Delivered" && (
                    <button
                      onClick={() => handleModalOpen(parcel?.deliveryMan?.id)}
                      className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800"
                    >
                      Review
                    </button>
                  )}
                </td>

                {/* Pay button (Bonus guideline logic to be implemented) */}
                <td className="px-6 py-3">
                  {parcel?.paymentStatus === "Payed" ||
                  parcel?.status !== "Delivered" ? (
                    <button
                      disabled
                      className="bg-gray-100 text-black px-2 py-1 rounded cursor-not-allowed"
                    >
                      {parcel?.paymentStatus === "Payed" ? "Payed" : "Pay"}
                    </button>
                  ) : (
                    <Link
                      to={`/dashboard/payment/${parcel?._id}`}
                      className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                    >
                      Pay
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagenation
          perpage={6}
          array={myParcel}
          setReturnArray={returnData}
        ></Pagenation>
      </div>
      <div className="fixed overflow-y-auto max-h-[90vh] top-[0%] w-full md:w-11/12 lg:w-9/12 left-[0%]  md:left-[35%]">
        {modalOpen && (
          <RevewModal id={id} handleModalOpen={handleModalOpen}></RevewModal>
        )}
      </div>
    </div>
  );
};

export default MyParcel;
