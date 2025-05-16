import React from 'react';
import ButtonPrimary from '../../../components/ShareComponents/ButtonPrimary';
import TypeWriter from '../../../utilities/TypeWriter';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <div
  className="hero min-h-[560px]"
  style={{
    backgroundImage:
      "url(https://i.ibb.co.com/QV4fMmV/download-12.jpg)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">🚚 <TypeWriter text='Deliver Smarter with GoDrop'></TypeWriter></h1>
      <p className="mb-5 text-gray-300">
      GoDrop is the ultimate parcel control center — book, assign, and deliver with full-stack power. Zero hassle. Full speed.
      </p>
      <Link to={'/dashboard'}>
      <ButtonPrimary text='Get Started'></ButtonPrimary>
      </Link>
    </div>
  </div>
  
</div>
        </div>
    );
};

export default Banner;