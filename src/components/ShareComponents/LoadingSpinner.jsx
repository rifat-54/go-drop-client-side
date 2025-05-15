import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='fixed top-[30%] left-[55%]'>
        <p className=' text-blue-500  text-center'><span className="loading loading-bars loading-lg"></span></p>
    </div>
    );
};

export default LoadingSpinner;