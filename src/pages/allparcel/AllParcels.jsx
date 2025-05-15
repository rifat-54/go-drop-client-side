import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ManageParcelModal from "../../components/modal/ManageParcelModal";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);
  const[parcelid,setParcelId]=useState(null)


  // get all parcel data
  const { data: allparcel = [], isLoading,refetch } = useQuery({
    queryKey: ["allparcel"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-parcel");
      return data;
    },
  });

  // console.log(allparcel);


  

  //   get booking data from modgodb _id
  const getbookingDate = (id) => {
    return new Date(
      parseInt(id.substring(0, 8), 16) * 1000
    ).toLocaleDateString();
  };

  //   handle modal

  const handleOpenModal = (id) => {
    
    setParcelId(id)
    setOpenModal(!openModal);
  };

  // select delevary man

  

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
                    className={`px-2 py-1 rounded text-white font-semibold
                    ${
                      parcel?.status === 'Pending'
                        ? 'bg-yellow-500'
                        : parcel?.status === 'On The Way'
                        ? 'bg-blue-500'
                        : parcel?.status === 'Delivered'
                        ? 'bg-green-600'
                        : parcel?.status === 'Cancelled'
                        ? 'bg-red-500'
                        : 'bg-gray-400'
                    }
                  `}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td>
                  <button
                  disabled={parcel?.status==='Delivered' || parcel?.status==='Cancelled'}
                    onClick={()=>handleOpenModal(parcel?._id)}
                    className={`btn btn-sm btn-outline btn-info text-black ${parcel.status==='Delivered' || parcel.status==='Cancelled'?' cursor-not-allowed bg-gray-100 text-black'
                  :
                'hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:text-white'
              }  `}
                  >
                    Manage
                  </button>
                </td>
               
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
      <div className="fixed top-[20%] w-full md:w-11/12 lg:w-9/12 left-[0%]  md:left-[35%]">
        {openModal && (
          <ManageParcelModal
            handleOpenModal={handleOpenModal}
            parcelid={parcelid}
            refetch={refetch}
          ></ManageParcelModal>
        )}
      </div>
    </div>
  );
};

export default AllParcels;
