import React from 'react';
import errorImg from '../assets/error_page.png';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';

const ErrorPage = () => {

    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className='flex flex-col w-11/12 mx-auto rounded-lg p-8 bg-base-300 m-6 items-center justify-center'>
                <img className='rounded-2xl' src={errorImg} alt="" />
            </div>
            <div className='w-11/12 mx-auto rounded-2xl bg-base-200 p-12 text-center text-4xl'>
                <p>404 ! Page Not Found</p>
            </div>
            <div className="text-center my-4">
                <button onClick={handleGoHome} className='btn btn-primary px-10 bg-blue-800 text-white'>
                    Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;