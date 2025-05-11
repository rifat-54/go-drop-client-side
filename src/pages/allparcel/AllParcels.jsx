import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ManageParcelModal from "../../components/modal/ManageParcelModal";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);

  const { data: allparcel = [], isLoading } = useQuery({
    queryKey: ["allparcel"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-parcel");
      return data;
    },
  });

  console.log(allparcel);

  //   get booking data from modgodb _id
  const getbookingDate = (id) => {
    return new Date(
      parseInt(id.substring(0, 8), 16) * 1000
    ).toLocaleDateString();
  };

  //   handle modal

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="relative">
      <div className={`p-4 ${openModal && "blur-md"}  overflow-x-auto z-50`}>
        <h2 className="text-2xl md:text-3xl text-center mb-10">All parcel</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Booking Date</th>
              <th>Delivery Date</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {allparcel.map((parcel, index) => (
              <tr key={index}>
                <td>{parcel?.name}</td>
                <td>{parcel?.phone}</td>

                <td>{getbookingDate(parcel?._id)}</td>
                <td>{parcel?.deliveryDate}</td>
                <td>${parcel?.price}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.status === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={handleOpenModal}
                    className="btn btn-sm btn-outline btn-info text-black hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  hover:text-white"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="fixed top-[20%] w-5/6 left-[35%]">
        {openModal && (
          <ManageParcelModal
            handleOpenModal={handleOpenModal}
          ></ManageParcelModal>
        )}
      </div>
    </div>
  );
};

export default AllParcels;
