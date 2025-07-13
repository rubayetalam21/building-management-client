import React from 'react';
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { NavLink } from 'react-router';

const Footer = () => {

    const navLinkStyle = ({ isActive }) =>
        isActive
            ? 'text-teal-500 font-semibold underline'
            : 'text-gray-700 hover:underline';

    return (
        <footer className=" w-11/12 mx-auto flex items-center justify-center flex-col gap-5 bg-base-200 text-base-content py-4 rounded p-2 my-5">

            <div className='flex flew-row'>
                <a className="text-2xl font-bold text-teal-500">Building Management</a>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-10 text-center md:text-left">
                <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                <NavLink to="/apartments" className={navLinkStyle}>Apartments</NavLink>
                
            </div>


            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a className='flex justify-center items-center rounded-full w-10 h-10 border' href="https://www.facebook.com/rubayetalam21/"
                        target="_blank"
                        rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a className='flex justify-center items-center rounded-full w-10 h-10 border' href="https://www.youtube.com/@shahmuhammadrubayetalam4747"
                        target="_blank"
                        rel="noopener noreferrer">
                        <FaYoutube />

                    </a>
                    <a className='flex justify-center items-center rounded-full w-10 h-10 border' href="https://www.linkedin.com/in/smrubayetalam/"
                        target="_blank"
                        rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                </div>
            </nav>

        </footer>
    );
};

export default Footer;