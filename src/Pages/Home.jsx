import React from 'react';
import AllApartments from './AllApartments';
import Slider from '../components/Slider';
import AboutBuilding from './AboutBuilding';
import CouponSection from './CouponSection';
import LocationSection from './LocationSection';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Slider></Slider>
            <AboutBuilding></AboutBuilding>
            <CouponSection></CouponSection>
            <LocationSection></LocationSection>
            <AllApartments></AllApartments>

        </div>
    );
};

export default Home;