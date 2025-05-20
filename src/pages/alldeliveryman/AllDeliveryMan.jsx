import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/ShareComponents/LoadingSpinner";
import toast from "react-hot-toast";
import Pagenation from "../../components/ShareComponents/Pagenation";
import VerifyDeliverModal from "../../components/modal/VerifyDeliverModal";

const AllDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();
  const [data, returnData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const {
    data: allDeliveryman = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allDeliveryman"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-deliveryman");
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // console.log(allDeliveryman);

  const handleUpdateSttus = async (id) => {
    setId(id);
    setOpen(!open);
  };

  return (
    <div className="p-4">
      <div className={`${open && "blur-md"}`}>
        <h2 className="text-2xl text-center my-5 font-bold mb-5">
          All Delivery Men
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Parcels Delivered</th>
                <th>Average Review</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((man, index) => (
                <tr key={man._id}>
                  <td>{index + 1}</td>
                  <td>{man?.name}</td>
                  <td>{man?.phone || "N/A"}</td>
                  <td>
                    <span
                      className={`${
                        man?.userStatus === "Pending" && "text-yellow-500"
                      } ${
                        man?.userStatus === "Verified" && "text-green-500"
                      } font-semibold  py-1 px-2 rounded-md`}
                    >
                      {man?.userStatus || "Not_Vefiry"}
                    </span>
                  </td>
                  <td>{man?.totalDelivered || 0}</td>
                  <td>{man?.avgRating ? man?.avgRating?.toFixed(1) : "N/A"}</td>
                  <td>
                    <button
                      onClick={() => handleUpdateSttus(man?._id)}
                      className={`btn bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white
                      }`}
                    >
                      See More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagenation
            perpage={5}
            array={allDeliveryman}
            setReturnArray={returnData}
          ></Pagenation>
        </div>
      </div>
      <div className="fixed overflow-y-auto max-h-[90vh] top-[2%] md:top-[10%] w-full md:w-11/12 lg:w-9/12 left-[0%]  md:left-[35%]">
        {open && (
          <VerifyDeliverModal
            handleModalOpen={handleUpdateSttus}
            id={id}
            refetch={refetch}
          ></VerifyDeliverModal>
        )}
      </div>
    </div>
  );
};

export default AllDeliveryMan;
