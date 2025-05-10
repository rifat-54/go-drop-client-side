import React from 'react';
import useAuth from '../../hooks/useAuth';
import ButtonPrimary from '../../components/ShareComponents/ButtonPrimary';
import useRole from '../../hooks/useRole';

const Profile = () => {
    const {user}=useAuth()
    const{role}=useRole();
    

    return (
        <div className='flex p-2 justify-center items-center'>
            <div className='bg-white  w-full mx-auto mt-28 rounded-md shadow-md  md:w-4/5 lg:w-4/6'>
                <div className='relative'>
                    <div className='absolute -top-12 right-[35%] md:right-[45%]'>

                    <img className='w-24 h-24 rounded-full'  src={user?.photoURL} alt="" />
                    </div>
                </div>
                <div>
                    <p className='text-center mt-16'><span className='text-xl font-semibold'>Role : </span><span className='font-bold text-xl'>{role}</span></p>
                </div>
                <div className='flex flex-wrap gap-10 mt-14 items-center justify-between px-3 md:px-10'>
                    <div>
                        <h2 className=' '>Name</h2>
                        <p className='text-[18px] font-semibold'>{user?.displayName}</p>
                    </div>
                    <div>
                        <h2 className=''>Email</h2>
                        <p className='text-[18px] font-semibold'>{user?.email}</p>
                    </div>
                    <div className='flex flex-col mb-10 space-y-4'>
                        <ButtonPrimary text='Update Profile'></ButtonPrimary>
                        <button className='btn hover:bg-[#E0F2FE] hover:text-red-500 hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105    '>Change Password</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;