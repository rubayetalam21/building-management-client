import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { motion } from 'framer-motion';

const Register = () => {
    const { createUser, setUser, updateUser } = useContext(AuthContext);
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        if (name.length < 5) {
            setNameError('Name should be more than 5 characters');
            return;
        } else setNameError('');

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!hasUppercase || !hasLowercase || !isLongEnough) {
            setPasswordError(
                'Password must contain at least 1 uppercase letter, 1 lowercase letter, and be at least 6 characters long.'
            );
            return;
        } else setPasswordError('');

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(async () => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        await fetch('https://b11a12-server-side-rubayetalam21.vercel.app/users', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name, email, photoURL: photo }),
                        });
                        Swal.fire({ icon: 'success', title: 'Registration Complete', text: 'Welcome!' });
                        navigate('/');
                    })
                    .catch((err) => {
                        console.error('Profile update failed:', err);
                        setUser(user);
                    });
            })
            .catch((err) => alert(err.message));
    };

    const fieldVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
        }),
        shake: {
            x: [0, -8, 8, -8, 8, 0],
            transition: { duration: 0.4 },
        },
    };

    return (
        <div className="min-h-screen px-16 py-8 bg-gradient-to-br from-cyan-100 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
            <Helmet><title>Register | Home</title></Helmet>

            <div className="grid md:grid-cols-2 gap-0 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-6xl w-full">

                {/* Left Welcome Panel */}
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
                        Join Home Arc Today!
                    </motion.h2>
                    <motion.p
                        className="text-lg max-w-md leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Create an account to start your journey — explore properties, manage agreements, and enjoy a smarter living experience.
                    </motion.p>

                    {/* Decorative Blurs */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                </motion.div>

                {/* Right Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-8 w-full"
                >
                    <h2 className="text-center text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">Create Account</h2>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <motion.div custom={0} initial="hidden" animate={nameError ? 'shake' : 'visible'} variants={fieldVariant}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input name="name" type="text" className="input input-bordered w-full mt-1" required />
                            {nameError && <p className="text-xs text-error">{nameError}</p>}
                        </motion.div>

                        <motion.div custom={1} initial="hidden" animate="visible" variants={fieldVariant}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL</label>
                            <input name="photo" type="text" className="input input-bordered w-full mt-1" required />
                        </motion.div>

                        <motion.div custom={2} initial="hidden" animate="visible" variants={fieldVariant}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input name="email" type="email" className="input input-bordered w-full mt-1" required />
                        </motion.div>

                        <motion.div custom={3} initial="hidden" animate={passwordError ? 'shake' : 'visible'} variants={fieldVariant}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="input input-bordered w-full mt-1 pr-10"
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-xl cursor-pointer text-gray-600 dark:text-gray-300"
                                >
                                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </span>
                            </div>
                            {passwordError && <p className="text-xs text-error">{passwordError}</p>}
                        </motion.div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn bg-gradient-to-r from-teal-500 to-cyan-500 text-white w-full mt-4"
                        >
                            Register
                        </motion.button>

                        <p className="text-sm text-center text-gray-600 dark:text-gray-300 pt-4">
                            Already have an account?{' '}
                            <Link className="text-blue-600 dark:text-blue-400 font-medium hover:underline" to="/auth/login">
                                Login
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
