import React from "react";

const WarningModal = ({handleModal,setUpdate}) => {
    const handefun=()=>{
        setUpdate(true)
        handleModal()

    }
  return (
    <div className="z-40 w-full px-16 sm:px-20 md:px-28 py-10  border-red-500 bg-white rounded-md  ">
        <h2 className="my-10 text-center text-2xl font-semibold">Are You Sure ?</h2>
      <div className="flex mt-8 gap-16 items-center justify-center">
          <button
            onClick={handefun}
            className="btn  bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white"
          >
            YES
          </button>
          <button onClick={handleModal} className="btn btn-outline">
            Cancel
          </button>
        </div>
    </div>
  );
};

export default WarningModal;
