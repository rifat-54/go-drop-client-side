import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/ShareComponents/LoadingSpinner";
import Swal from "sweetalert2";
import Pagenation from "../../components/ShareComponents/Pagenation";

const MyDeliveryList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [data, returnData] = useState([]);

  const {
    data: deiveryList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["deiveryList"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-delivery-list/${user.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // console.log(deiveryList);

  // update status

  const handleUpdateStauts = (newStatus, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // update stauts

        try {
          const { data } = await axiosSecure.patch(
            `/update-booking-status/${id}`,
            { newStatus }
          );
          // console.log(data);
          if (data?.modifiedCount) {
            Swal.fire({
              title: "Updated!",
              text: "Status Is Updated.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        } catch (error) {}
      }
    });
  };

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-bold text-center mb-6">My Delivery List</h2>

      <div className={`overflow-x-auto `}>
        <table className="table w-full text-sm">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Booked User</th>
              <th>User Phone</th>
              <th>Receiver</th>
              <th>Receiver Phone</th>
              <th>Delivery Date</th>
              <th>Approx. Delivery Date</th>
              <th>Status</th>
              <th>Address</th>
              <th>Location</th>
              <th>Cancel</th>
              <th>Deliver</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <td>{index + 1}</td>
                <td>{parcel?.name}</td>
                <td>{parcel?.phone}</td>
                <td>{parcel?.receiverName}</td>
                <td>{parcel?.receiverPhone}</td>
                <td>{parcel?.deliveryDate}</td>
                <td>{parcel?.deliveryMan?.approximatedate}</td>
                <td>
                  <span
                    className={`${
                      parcel?.status === "On The Way" && "text-yellow-500"
                    }
                  ${parcel?.status === "Cancelled" && "text-red-500"}
                  ${parcel?.status === "Delivered" && "text-green-500"}
                  `}
                  >
                    {parcel?.status}
                  </span>
                </td>
                <td>{parcel?.deliveryAddress}</td>

                <td>
                  <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
                    View
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleUpdateStauts("Cancelled", parcel?._id)}
                    disabled={parcel?.status !== "On The Way"}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleUpdateStauts("Delivered", parcel?._id)}
                    disabled={parcel?.status !== "On The Way"}
                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                  >
                    Deliver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagenation 
        perpage={7}
          array={deiveryList}
          setReturnArray={returnData}
        ></Pagenation>
      </div>
    </div>
  );
};

export default MyDeliveryList;
