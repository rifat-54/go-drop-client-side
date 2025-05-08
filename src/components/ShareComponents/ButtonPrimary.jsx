import React from 'react';

const ButtonPrimary = ({text=''}) => {
    return (
        <button className="btn bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white  ">
              {text}
            </button>
    );
};

export default ButtonPrimary;