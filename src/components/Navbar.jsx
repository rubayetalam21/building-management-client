import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userImage from "../assets/user.png";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Logged Out",
                    text: "You have been successfully logged out!",
                    timer: 1500,
                    showConfirmButton: false,
                });
                setDropdownOpen(false);
                navigate("/");
            })
            .catch((error) => console.error(error));
    };

    const navLinkStyle = ({ isActive }) =>
        `relative px-3 py-1 font-medium transition-all duration-300 
    ${isActive
            ? "text-teal-500"
            : "text-gray-700 dark:text-gray-200 hover:text-teal-500"
        }
    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px]
    after:bg-teal-500 after:transition-all after:duration-300 group-hover:after:w-full`;

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md shadow-lg border-b border-gray-200/30 dark:border-gray-700/30">
            <div className="w-11/12 mx-auto py-3 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-teal-400 mb-2"
                >
                    🏢 Building Management
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <NavLink to="/" className={navLinkStyle}>
                        Home
                    </NavLink>
                    <NavLink to="/apartments" className={navLinkStyle}>
                        Apartments
                    </NavLink>
                    <NavLink to="/coupons" className={navLinkStyle}>
                        Coupon
                    </NavLink>
                     <NavLink to="/reviews" className={navLinkStyle}>
                        Reviews
                    </NavLink>
                    <NavLink to="/amenities" className={navLinkStyle}>
                        Amenities
                    </NavLink>
            
                    

                    {/* Theme toggle */}
                    <label className="label cursor-pointer gap-2">
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                            {theme === "dark" ? "Dark" : "Light"} Mode
                        </span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            onChange={toggleTheme}
                            checked={theme === "dark"}
                        />
                    </label>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        {user ? (
                            <div
                                className="cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <img
                                    className="w-10 h-10 rounded-full border-2 border-teal-400 shadow-md"
                                    src={user.photoURL || userImage}
                                    alt="User"
                                />
                            </div>
                        ) : (
                            <Link
                                to="/auth/login"
                                className="btn bg-gradient-to-r from-teal-400 to-teal-600 text-white px-6 rounded-full shadow hover:opacity-90"
                            >
                                Login
                            </Link>
                        )}

                        {/* Dropdown */}
                        {user && dropdownOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 animate-fade-in">
                                <div className="p-4 text-gray-800 dark:text-gray-200 font-semibold border-b">
                                    {user.displayName || "User"}
                                </div>
                                <Link
                                    to="/dashboard"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-md"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogOut}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-md"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile toggle button */}
                <button
                    className="md:hidden text-2xl text-gray-700 dark:text-gray-200"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-6 py-4 space-y-3 shadow-md animate-slide-down">
                    <NavLink to="/" className={navLinkStyle}>
                        Home
                    </NavLink>
                    <NavLink to="/apartments" className={navLinkStyle}>
                        Apartments
                    </NavLink>

                    {/* Theme Toggle */}
                    <label className="label cursor-pointer gap-2">
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                            {theme === "dark" ? "Dark" : "Light"} Mode
                        </span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            onChange={toggleTheme}
                            checked={theme === "dark"}
                        />
                    </label>

                    {/* User Info */}
                    <div className="flex items-center gap-3 mt-4">
                        <img
                            className="w-10 h-10 rounded-full border-2 border-teal-400 shadow"
                            src={user?.photoURL || userImage}
                            alt="User"
                        />
                        <span className="text-gray-900 dark:text-white font-medium">
                            {user?.displayName || "Guest"}
                        </span>
                    </div>

                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="btn bg-gradient-to-r from-teal-400 to-teal-600 text-white w-full mt-3 rounded-full shadow hover:opacity-90"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogOut}
                                className="btn btn-error w-full mt-2 rounded-full"
                            >
                                LogOut
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/auth/login"
                            className="btn bg-gradient-to-r from-teal-400 to-teal-600 text-white w-full mt-3 rounded-full shadow hover:opacity-90"
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
