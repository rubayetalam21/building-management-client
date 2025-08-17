import React from 'react';
import { FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    const navLinkStyle = ({ isActive }) =>
        `relative px-2 py-1 transition-all duration-300 ease-in-out group
        ${isActive ? 'text-teal-400 font-semibold' : 'text-gray-300 hover:text-teal-400'}
        after:content-[""] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px]
        after:bg-teal-400 after:transition-all after:duration-300 group-hover:after:w-full`;

    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-6">

                {/* Brand */}
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-2xl font-bold text-teal-400 mb-2">🏢 Building Management</h2>
                    <p className="text-sm text-gray-400">Providing quality apartments & excellent services</p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-5 text-base">
                    <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                    <NavLink to="/apartments" className={navLinkStyle}>Apartments</NavLink>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 mt-3 md:mt-0">
                    <a
                        href="https://www.facebook.com/rubayetalam21/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white shadow-lg transition-transform transform hover:-translate-y-1"
                    >
                        <FaFacebook size={20} />
                    </a>
                    <a
                        href="https://www.youtube.com/@shahmuhammadrubayetalam4747"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white shadow-lg transition-transform transform hover:-translate-y-1"
                    >
                        <FaYoutube size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/smrubayetalam/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gray-800 hover:bg-blue-500 text-gray-300 hover:text-white shadow-lg transition-transform transform hover:-translate-y-1"
                    >
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center text-gray-500 text-sm mt-8">
                © {new Date().getFullYear()} Home Arc / Building Management. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
