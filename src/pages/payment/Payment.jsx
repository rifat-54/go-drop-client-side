import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/ShareComponents/LoadingSpinner';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutFrom from './CheckOutFrom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const Payment = () => {
    const axisSecure=useAxiosSecure();
    const{user}=useAuth()
    const {id}=useParams();

    const {data:myParcel=[],isLoading}=useQuery({
        queryKey:['myParcel'],
        queryFn:async()=>{
            const {data}=await axisSecure(`/parcel-data/${id}`)
            return data;
        }
    })

    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }


    // console.log(myParcel);


    return (
        <div className="card mt-14 mx-auto bg-base-100 max-w-xl shadow-xl">
          <div className="card-body">
            <div>
              <p>
                {" "}
                Name: <span className="font-semibold">{user?.displayName}</span>
              </p>
              <p className="mt-1 mb-2">
                {" "}
                Email: <span className="font-semibold">{user?.email}</span>
              </p>
              <p>
                {" "}
                Price: <span className="font-bold">${myParcel?.price}</span>
              </p>
            </div>
            <div className="divider"></div>
    
            <Elements stripe={stripePromise}>
              <CheckOutFrom price={myParcel?.price} data={myParcel} id={id}></CheckOutFrom>
            </Elements>
          </div>
        </div>
      );
};

export default Payment;