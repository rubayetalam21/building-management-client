import React from 'react';
import AllApartments from './AllApartments';
import Slider from '../components/Slider';
import AboutBuilding from './AboutBuilding';
import CouponSection from './CouponSection';
import LocationSection from './LocationSection';
import { Helmet } from 'react-helmet-async';
import Review from './Review';
import AmenitiesSection from './AmenitiesSection';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Slider></Slider>
            <AboutBuilding></AboutBuilding>
            <CouponSection></CouponSection>
            <LocationSection></LocationSection>
            <AmenitiesSection></AmenitiesSection>
            <Review></Review>
            <AllApartments></AllApartments>
            

        </div>
    );
};

export default Home;