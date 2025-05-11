import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/ShareComponents/LoadingSpinner";
import WarningModal from "../../components/modal/WarningModal";


const MyDeliveryList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const[updateStatusText,setUpdateStatusText]=useState('')

  const { data: deiveryList = [], isLoading } = useQuery({
    queryKey: ["deiveryList"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-delivery-list/${user.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  console.log(deiveryList);

  //   handle modal
  const handleModal = () => {
    setOpen(!open);
    if(update){
        handleUpdateStauts('new')
    }

  };

  // update status

  const handleUpdateStauts = (newStatus) => {
    if(!open && !update){
        setUpdateStatusText(newStatus)
        handleModal();
    }
    

    console.log(updateStatusText,update);
  };

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-bold text-center mb-6">My Delivery List</h2>

      <div className={`overflow-x-auto ${open && "blur-md"}`}>
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
            {deiveryList?.map((parcel, index) => (
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
                <td>{parcel?.status}</td>
                <td>{parcel?.deliveryAddress}</td>

                <td>
                  <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
                    View
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleUpdateStauts("Cancelled")}
                    disabled={parcel?.status === "Cancelled"}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleUpdateStauts("Delivered")}
                    disabled={parcel?.status === "Delivered"}
                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                  >
                    Deliver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="fixed top-[20%] right-[20%]">
        {open && (
          <WarningModal
            handleModal={handleModal}
            setUpdate={setUpdate}
          ></WarningModal>
        )}
      </div>
    </div>
  );
};

export default MyDeliveryList;
