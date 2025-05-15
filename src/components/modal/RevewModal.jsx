import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const RevewModal = ({ id, handleModalOpen }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();



  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const feedback=e.target.feedback.value;
    const rating=e.target.rating.value;

    // console.log(id,feedback,rating);

    // send data to database

    const info = {
      userName:user.displayName,
      userEmail:user.email,
      photo:user?.photoURL,
      deliverManId:id,
      rating,
      feedback
     
    };

    // console.log(info);

    try {
      const { data } = await axiosSecure.post('/revews',
        info
      );
      // console.log(data);
      if (data?.insertedId) {
        toast.success("Thanks for sharing your experience");
       
        handleModalOpen();
      }
    } catch (error) {}


  };

  return (
    <div className="z-40 w-full md:px-2  md:w-4/6 bg-white rounded-md  ">
      <form onSubmit={handleSubmit} className="px-10 space-y-5 from py-10">
        {/* user name */}
        <div>
          <label className="block my-2 font-semibold">User’s Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full border rounded cursor-not-allowed bg-gray-100 p-2"
            required
          />
        </div>
        {/* user email */}
        <div>
          <label className="block my-2 font-semibold">User’s Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full border rounded cursor-not-allowed bg-gray-100 p-2"
            required
          />
        </div>
        {/* delivery man id */}
        <div>
          <label className="block my-2 font-semibold">Delivery Men’s ID</label>
          <input
            type="email"
            value={id}
            readOnly
            className="w-full border rounded cursor-not-allowed bg-gray-100 p-2"
            required
          />
        </div>

        
        {/* rating */}
        <div className="mt-4">
          <label className="block my-2 font-semibold">Rating out of 5</label>
          <select
            defaultValue={"5"}
            
            name="rating"
            placeholder="give rating"
            className="input input-bordered w-full bg-white/20 text-black placeholder-white/80"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* feedback text */}
        
         <div>
          <label className="block my-2 font-semibold">
          Feedback 
          </label>
          <textarea
            name="feedback"
           placeholder="Write Your Feedback...."
            className="w-full border rounded p-2"
            rows={3}
            required
          ></textarea>
        </div>

        <div className="flex mt-8 gap-16 items-center justify-center">
          <button
            type="submit"
            className="btn  bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white"
          >
            Submit
          </button>
          <button onClick={handleModalOpen} className="btn btn-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RevewModal;
