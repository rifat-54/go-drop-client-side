import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/ShareComponents/LoadingSpinner";
import useRole from "./../../hooks/useRole";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const { role } = useRole();

  const { data: alluser = [], isLoading,refetch } = useQuery({
    queryKey: ["alluser"],
    queryFn: async () => {
      const { data } = await axiosSecure("/allusers");
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // pagenaion

  const perpage = 5;
  const toatlPage = Math.ceil(alluser.length / perpage);

  const lastIndex = currentPage * perpage;
  const firstIndex = lastIndex - perpage;

  const currentUsers = alluser.slice(firstIndex, lastIndex);

  // console.log(currentUsers);

  const handleUpdateStatus = (updateRole, id) => {
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
        try {
          const { data } = await axiosSecure.patch(`/update-user-role/${id}`, {
            updateRole,
          });

          if (data.modifiedCount) {
            Swal.fire({
              title: "Updated!",
              text: "Role is Updated.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch()
          }
        } catch (error) {}
      }
    });
  };

  return (
    <div className="p-4  overflow-x-auto z-50">
      <h2 className="text-2xl md:text-3xl text-center mb-10">All Users</h2>
      <table className="min-w-full table bg-white border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Parcels</th>
            <th className="px-4 py-2 text-left">Total Spent</th>
            <th className="px-4 py-2 text-left">Role</th>

            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers?.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.phone || "N/A"}</td>
              <td className="px-4 py-3">{user?.totalBooked || 0}</td>
              <td className="px-4 py-3">
                {user?.toalCost ? `$${user?.toalCost}` : "-"}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`${user?.role === "Admin" && "text-blue-500"}
                ${user?.role === "User" && "text-green-500"}
                ${user?.role === "Delivery Man" && "text-yellow-500"}
                `}
                >
                  {user?.role}
                </span>
              </td>
              <td className="px-4 py-3 flex items-center text-xs space-x-2">
                <button
                  disabled={user?.role === "Delivery Man"}
                  className={`
                    ${
                      user?.role === "Delivery Man"
                        ? " cursor-not-allowed bg-gray-100 text-black"
                        : "bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-white "
                    }
                        px-2 py-1 rounded`}
                  onClick={() => handleUpdateStatus("Delivery Man", user?._id)}
                >
                  Make Delivery Men
                </button>

                <button
                  disabled={user?.role === "Admin"}
                  className={`${
                    user.role === "Admin"
                      ? "cursor-not-allowed bg-slate-200"
                      : " hover:transition  duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                  }  text-black px-2 outline py-1 rounded`}
                  onClick={() => handleUpdateStatus("Admin", user?._id)}
                >
                  Make Admin
                </button>
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
              currentPage === pageNum ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
