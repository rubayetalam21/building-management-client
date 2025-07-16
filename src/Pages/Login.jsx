import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

const Login = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const { signIn, googleLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;

        signIn(email, password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged In',
                    text: 'You have been successfully logged in!',
                });
                navigate(location.state?.from?.pathname || "/");
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: 'Enter the proper credentials',
                });
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Google Login Successful',
                    text: 'Welcome!',
                });
                navigate(location.state?.from?.pathname || "/");
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Google Login Failed',
                    text: err.message,
                });
            });
    };

    const handleForgotPassword = () => {
        if (!email) {
            Swal.fire({
                icon: 'warning',
                title: 'Email Required',
                text: 'Please enter your email address first.',
            });
            return;
        }
        navigate("/auth/password", { state: { forgetEmail: email } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-16">
            <Helmet>
                <title>Login | Home</title>
            </Helmet>

            <div className="grid md:grid-cols-2 gap-0 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-6xl w-full">

                {/* Left - Welcome Message Section */}
                <motion.div
                    className="hidden md:flex flex-col justify-center items-center px-10 py-16 bg-gradient-to-tr from-cyan-400 to-teal-500 text-white text-center relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h2
                        className="text-4xl font-extrabold mb-4 drop-shadow-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Welcome Back!
                    </motion.h2>

                    <motion.p
                        className="text-lg max-w-md leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Ready to manage your home with ease? Sign in to explore available apartments, manage agreements, and more.
                    </motion.p>

                    {/* Decorative Circles */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                </motion.div>

                {/* Right - Login Form */}
                <motion.div
                    className="p-8 w-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-center text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">
                        Sign in to your account
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="input input-bordered w-full mt-1"
                                placeholder="example@email.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                            <input
                                name="password"
                                type="password"
                                className="input input-bordered w-full mt-1"
                                placeholder="********"
                                required
                            />
                        </motion.div>

                        {/* Forgot Password */}
                        <motion.div
                            className="text-right text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Forgot password?
                            </button>
                        </motion.div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className="btn bg-gradient-to-r from-teal-500 to-cyan-500 text-white w-full"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Login
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <motion.div
                        className="divider my-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        OR
                    </motion.div>

                    {/* Google Button */}
                    <motion.button
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full flex items-center justify-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </motion.button>

                    {/* Register Link */}
                    <motion.p
                        className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        Don’t have an account?{' '}
                        <Link className="text-blue-600 dark:text-blue-400 hover:underline font-medium" to="/auth/register">
                            Register
                        </Link>
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );



};

export default Login;
