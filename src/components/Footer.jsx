import React from 'react';
import { FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    const navLinkStyle = ({ isActive }) =>
        `relative px-2 py-1 transition-all duration-300 ease-in-out group
        ${isActive ? 'text-teal-600 font-semibold' : 'text-gray-700 hover:text-teal-600'}
        after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px]
        after:bg-teal-500 after:transition-all after:duration-300 group-hover:after:w-full`;

    return (
        <footer className="bg-gray-100 text-gray-800 py-6 px-6 rounded-xl mt-10 shadow-inner border border-gray-200">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">

                {/* Brand Name */}
                <div>
                    <a className="text-2xl font-bold text-teal-600">🏢 Building Management</a>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-5 text-base">
                    <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                    <NavLink to="/apartments" className={navLinkStyle}>Apartments</NavLink>
                </div>

                {/* Social Icons */}
                <div className="flex gap-5 mt-3">
                    <a
                        href="https://www.facebook.com/rubayetalam21/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-gray-600 hover:text-blue-600 transition duration-300 p-2 rounded-full bg-white hover:bg-blue-50 shadow-sm"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href="https://www.youtube.com/@shahmuhammadrubayetalam4747"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-gray-600 hover:text-red-600 transition duration-300 p-2 rounded-full bg-white hover:bg-red-50 shadow-sm"
                    >
                        <FaYoutube />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/smrubayetalam/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-gray-600 hover:text-blue-500 transition duration-300 p-2 rounded-full bg-white hover:bg-blue-50 shadow-sm"
                    >
                        <FaLinkedin />
                    </a>
                </div>

                {/* Footer Bottom */}
                <div className="text-xs text-gray-500 mt-3">
                    © {new Date().getFullYear()} Home Arc / Building Management. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
