import React, { useEffect, useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import userImage from "../assets/user.png";
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
        isActive ? 'text-teal-500 font-semibold underline' : 'text-gray-700 dark:text-gray-200 hover:underline';

    return (
        <nav className="bg-base-100 shadow px-4 py-3 mt-4 z-50 relative">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="font-bold text-2xl text-teal-500">🏢 Building Management</Link>

                <div className="hidden md:flex items-center gap-6">
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

                    {/* Profile Section */}
                    <div className="relative">
                        {user ? (
                            <div className="cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <img
                                    className="w-10 h-10 rounded-full border"
                                    src={user.photoURL || userImage}
                                    alt="User"
                                />
                            </div>
                        ) : (
                            <Link to="/auth/login" className="btn bg-teal-500 text-black px-6">Login</Link>
                        )}

                        {/* Dropdown */}
                        {user && dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
                                <div className="p-3 text-gray-800 font-semibold border-b">
                                    {user.displayName || "User"}
                                </div>
                                <Link
                                    to="/dashboard"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogOut}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile toggle button */}
                <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>
            </div>

            {/* Mobile dropdown menu */}
            {isOpen && (
                <div className="md:hidden mt-3 space-y-2 flex flex-col">
                    <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                    <NavLink to="/apartments" className={navLinkStyle}>Apartments</NavLink>

                    {/* Theme toggle */}
                    <label className="label cursor-pointer gap-2 px-4">
                        <span className="text-sm">{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            onChange={toggleTheme}
                            checked={theme === 'dark'}
                        />
                    </label>

                    {/* Auth section mobile */}
                    <div className="flex items-center gap-3 mt-4 px-4">
                        <img className="w-10 h-10 rounded-full border" src={user?.photoURL || userImage} alt="User" />
                        <span>{user?.displayName || "Guest"}</span>
                    </div>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="btn w-full mt-2">Dashboard</Link>
                            <button onClick={handleLogOut} className="btn btn-error w-full mt-2">LogOut</button>
                        </>
                    ) : (
                        <Link to="/auth/login" className="btn btn-primary w-full mt-2 text-gray-900">Login</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
