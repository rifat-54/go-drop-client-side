import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const imgbbKey = import.meta.env.VITE_IMGBB_KEY;

const UpdateProfileModal = ({ handleOpenModal }) => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUser } = useAuth();
  const [img, setImg] = useState(user?.photoURL);

  const handeUploadImg = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    setImg(previewUrl);
    // console.log(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateName = e.target.name.value;
    const imgfile = e.target.image.files[0];

    // console.log(updateName,imgbbKey);

    const formData = new FormData();
    formData.append("image", imgfile);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const imageUrl = data.data.url;
      //   console.log(imageUrl);

      //   info

      const info = {
        name: updateName,
        image: imageUrl,
      };

      //   update fire base
      updateUser(updateName, imageUrl)
      .then(async () => {
        try {
          // update to database
          const { data } = await axiosSecure.patch(
            `/user/update/${user?.email}`,
            info
          );

          if (data?.modifiedCount) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Updated Profile",
              showConfirmButton: false,
              timer: 1500,
            });
            handleOpenModal();
            window.location.reload();
          }
        } catch (error) {}
      });
    } catch (error) {}
  };

  return (
    <div className="z-40 w-full md:px-2 md:w-4/6 bg-white rounded-md  ">
      <form onSubmit={handleSubmit} className="px-10 from py-10">
        <div className="flex items-center justify-center">
          <img className="w-20 h-16 rounded-md" src={img} alt="img" />
        </div>
        <div>
          <label className="block my-2 font-semibold">User Name:</label>
          <input
            defaultValue={user?.displayName}
            type="text"
            name="name"
            placeholder="Write Your update name"
            className="w-full border rounded bg-gray-100 p-2"
            required
          />
        </div>

        <div>
          <label className="block my-2 font-semibold">Choose Photo:</label>
          <input
            onChange={handeUploadImg}
            type="file"
            name="image"
            accept="image/*"
            className=" border w-full rounded bg-gray-100 p-2"
            required
          />
        </div>

        <div className="flex mt-8 gap-16 items-center justify-center">
          <button
            type="submit"
            className="btn  bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white"
          >
            Update
          </button>
          <button onClick={handleOpenModal} className="btn btn-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
