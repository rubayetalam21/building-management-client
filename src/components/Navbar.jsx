import React, { useEffect, useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import userImage from '../assets/user.png';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const navigate = useNavigate();

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
                setDropdownOpen(false);
                navigate('/');
            })
            .catch((error) => console.error(error));
    };

    const navLinkStyle = ({ isActive }) =>
        `relative px-2 py-1 font-medium transition-all duration-300 ease-in-out group
    ${isActive ? 'text-teal-500' : 'text-gray-800 dark:text-gray-200 hover:text-teal-500'}
    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px]
    after:bg-teal-500 after:transition-all after:duration-300 group-hover:after:w-full`;



    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg shadow-md border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="font-bold text-2xl text-teal-600">🏢 Building Management</Link>

                <div className="hidden md:flex items-center gap-6">
                    <div className="flex gap-6">
                        <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                        <NavLink to="/apartments" className={navLinkStyle}>Apartments</NavLink>
                    </div>

                    {/* Theme toggle */}
                    <label className="label cursor-pointer gap-2">
                        <span className="text-sm text-gray-800 dark:text-gray-200">
                            {theme === 'dark' ? 'Dark' : 'Light'} Mode
                        </span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            onChange={toggleTheme}
                            checked={theme === 'dark'}
                        />
                    </label>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        {user ? (
                            <div
                                className="cursor-pointer"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <img
                                    className="w-10 h-10 rounded-full border"
                                    src={user.photoURL || userImage}
                                    alt="User"
                                />
                            </div>
                        ) : (
                            <Link to="/auth/login" className="btn bg-teal-500 text-white px-6">Login</Link>
                        )}

                        {/* Dropdown */}
                        {user && dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-lg border z-50 animate-fade-in">
                                <div className="p-3 text-gray-800 dark:text-gray-200 font-semibold border-b">
                                    {user.displayName || "User"}
                                </div>
                                <Link
                                    to="/dashboard"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogOut}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile toggle button */}
                <button className="md:hidden text-2xl text-gray-700 dark:text-gray-200" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-3 space-y-2">
                    <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                    <NavLink to="/apartments" className={navLinkStyle}>Apartments</NavLink>

                    {/* Theme Toggle */}
                    <label className="label cursor-pointer gap-2">
                        <span className="text-sm text-gray-800 dark:text-gray-200">
                            {theme === 'dark' ? 'Dark' : 'Light'} Mode
                        </span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            onChange={toggleTheme}
                            checked={theme === 'dark'}
                        />
                    </label>

                    {/* User Info */}
                    <div className="flex items-center gap-3 mt-4">
                        <img className="w-10 h-10 rounded-full border" src={user?.photoURL || userImage} alt="User" />
                        <span className="text-gray-900 dark:text-white">{user?.displayName || "Guest"}</span>
                    </div>

                    {user ? (
                        <>
                            <Link to="/dashboard" className="btn w-full mt-2">Dashboard</Link>
                            <button onClick={handleLogOut} className="btn btn-error w-full mt-2">LogOut</button>
                        </>
                    ) : (
                        <Link to="/auth/login" className="btn btn-primary w-full mt-2">Login</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
