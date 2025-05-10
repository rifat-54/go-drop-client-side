import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/ShareComponents/LoadingSpinner';
import Pagenation from '../../components/ShareComponents/Pagenation';

const AllUsers = () => {
    const axiosSecure=useAxiosSecure()
    const [currentPage,setCurrentPage]=useState(1)



    const{data:alluser=[],isLoading}=useQuery({
        queryKey:['alluser'],
        queryFn:async()=>{
            const {data}=await axiosSecure('/allusers')
            return data;
        }
    })

    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    
   

    // pagenaion

    const perpage=5;
    const toatlPage=Math.ceil(alluser.length/perpage)

    const lastIndex=currentPage*perpage;
    const firstIndex=lastIndex-perpage;

    const currentUsers=alluser.slice(firstIndex,lastIndex);
    

    console.log(currentUsers);
  
  const handleMakeAdmin = (id) => {
    // call backend API to change role to admin
    console.log("Make Admin:", id);
  };

  const handleMakeDeliveryMan = (id) => {
    // call backend API to change role to delivery-man
    console.log("Make Delivery Man:", id);
  };

  return (
    <div className="p-4  overflow-x-auto z-50">
        <h2 className='text-2xl md:text-3xl text-center mb-10'>All Users</h2>
      <table className="min-w-full table bg-white border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Parcels</th>
            <th className="px-4 py-2 text-left">Total Spent</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers?.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.phone || 'N/A'}</td>
              <td className="px-4 py-3">{user?.totalBooked || 0}</td>
              <td className="px-4 py-3">{user?.toalCost ? `$${user?.toalCost}` : '-'}</td>
              <td className="px-4 py-3 flex items-center text-xs space-x-2">

                {user.role !== 'delivery-man' && (
                  <button
                    className="bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white  px-2 py-1 rounded"
                    onClick={() => handleMakeDeliveryMan(user._id)}
                  >
                    Make Delivery Men
                  </button>
                  
                )}

                  {user.role !== 'admin' && (
                  <button
                    className=" hover:transition outline duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-black px-2 py-1 rounded"
                    onClick={() => handleMakeAdmin(user._id)}
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


        {/* pagination */}
        

        <div className="flex justify-center mt-4">
        {Array.from({ length: toatlPage }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
     
    </div>
  )

};

export default AllUsers;