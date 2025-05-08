import React from 'react';
import Banner from './homeComponents/Banner';
import OurFreature from './homeComponents/OurFreature';
import Statistics from './homeComponents/Statistics';
import TopDelivaryMan from './homeComponents/TopDelivaryMan';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurFreature></OurFreature>
            <Statistics></Statistics>
            <TopDelivaryMan></TopDelivaryMan>
        </div>
    );
};

export default Home;