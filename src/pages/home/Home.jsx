import React from 'react';
import Banner from './homeComponents/Banner';
import OurFreature from './homeComponents/OurFreature';

import TopDelivaryMan from './homeComponents/TopDelivaryMan';
import Stats from './homeComponents/Stats';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurFreature></OurFreature>
            <Stats></Stats>
            <TopDelivaryMan></TopDelivaryMan>
        </div>
    );
};

export default Home;