import React from 'react';
import AllApartments from './AllApartments';
import Slider from '../components/Slider';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <AllApartments></AllApartments>
        </div>
    );
};

export default Home;