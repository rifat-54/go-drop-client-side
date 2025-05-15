import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/ShareComponents/LoadingSpinner";
import toast from "react-hot-toast";

const AllDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allDeliveryman = [], isLoading,refetch } = useQuery({
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


  const handleUpdateSttus= async(id)=>{

    const{data}=await axiosSecure.patch(`/update-deliveryman-status/${id}`)
    
    refetch()
    if(data.modifiedCount){
      toast.success('Successfully Updated')
    }

  }

  return (
    <div className="p-4">
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
            {allDeliveryman.map((man, index) => (
              <tr key={man._id}>
                <td>{index + 1}</td>
                <td>{man?.name}</td>
                <td>{man?.phone || 'N/A'}</td>
                <td>
                    <span className={`${man?.userStatus==='Pending' && 'text-yellow-500'} ${man?.userStatus==='Verified' && 'text-green-500'} font-semibold  py-1 px-2 rounded-md`}>

                    {man?.userStatus || 'Not_Vefiry'}
                    </span>
                    
                    </td>
                <td>{man?.deliveredParcels || 0}</td>
                <td>
                  {man?.averageReview ? man.averageReview.toFixed(1) : "N/A"}
                </td>
                <td>
                <button onClick={()=>handleUpdateSttus(man?._id)} className={`btn  ${man?.userStatus==='Pending'?  ' bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white '  : 'bg-white text-black cursor-not-allowed'}`}>
              Verify User
            </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDeliveryMan;
