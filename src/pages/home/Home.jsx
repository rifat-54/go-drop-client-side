import React from 'react';
import Banner from './homeComponents/Banner';
import OurFreature from './homeComponents/OurFreature';

import TopDelivaryMan from './homeComponents/TopDelivaryMan';
import Stats from './homeComponents/Stats';
import HowItWork from './homeComponents/HowItWork';
import Testimonials from './homeComponents/Testimonials';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurFreature></OurFreature>
            <Stats></Stats>
            <TopDelivaryMan></TopDelivaryMan>
            <HowItWork></HowItWork>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;