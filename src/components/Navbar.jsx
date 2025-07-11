import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import userImage from "../assets/user.png";
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = React.useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Apply theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged Out',
                    text: 'You have been successfully logged out!',
                });
            })
            .catch((error) => console.error(error));
    };

    const navLinkStyle = ({ isActive }) =>
        isActive ? 'text-teal-500 font-semibold underline' : 'text-gray-700 dark:text-gray-200 hover:underline';

    return (
        <nav className="bg-base-100 shadow px-4 py-3 mt-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h2 className="font-bold text-2xl text-teal-500">Building Management</h2>

                {/* Desktop nav - hidden on small screens */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Nav links */}
                    <div className="flex gap-6">
                        <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                        <NavLink to="/apartments" className={navLinkStyle}>Apartments</NavLink>
                        
                    </div>

                    {/* Theme toggle */}
                    <div className="form-control">
                        <label className="label cursor-pointer gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-600">
                                {theme === 'dark' ? 'Dark' : 'Light'} Mode
                            </span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                onChange={toggleTheme}
                                checked={theme === 'dark'}
                            />
                        </label>
                    </div>

                    {/* Auth section */}
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <img
                                className="w-10 h-10 rounded-full border cursor-pointer"
                                src={user?.photoURL || userImage}
                                alt="User"
                            />
                            {user && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-12 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                    {user.displayName || "User"}
                                </div>
                            )}
                        </div>

                        {user ? (
                            <button onClick={handleLogOut} className="btn bg-teal-500 text-white px-6">LogOut</button>
                        ) : (
                            <Link to="/auth/login" className="btn bg-teal-500 text-black px-6">Login</Link>
                        )}
                    </div>
                </div>

                {/* Mobile menu toggle button - hidden on medium and up */}
                <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>
            </div>

            {/* Mobile dropdown menu - only visible on small screens */}
            {isOpen && (
                <div className="md:hidden mt-3 space-y-2 flex flex-col">
                    <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                    <NavLink to="/availableFoods" className={navLinkStyle}>Available Foods</NavLink>
                    <NavLink to="/manageFoods" className={navLinkStyle}>Manage My Foods</NavLink>
                    <NavLink to="/requestFoods" className={navLinkStyle}>My Food Requests</NavLink>
                    <NavLink to="/addFood" className={navLinkStyle}>Add Food</NavLink>

                    {/* Theme toggle for mobile */}
                    <label className="label cursor-pointer gap-2 px-4">
                        <span className="text-sm">{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            onChange={toggleTheme}
                            checked={theme === 'dark'}
                        />
                    </label>

                    {/* Mobile Auth Section */}
                    <div className="flex items-center gap-3 mt-4 px-4">
                        <img className="w-10 h-10 rounded-full border" src={user?.photoURL || userImage} alt="User" />
                        <span>{user?.displayName || "Guest"}</span>
                    </div>
                    {user ? (
                        <button onClick={handleLogOut} className="btn btn-primary w-full mt-2">LogOut</button>
                    ) : (
                        <Link to="/auth/login" className="btn btn-primary w-full mt-2 text-gray-900">Login</Link>
                    )}
                </div>
            )}
        </nav>

    );
};


export default Navbar;