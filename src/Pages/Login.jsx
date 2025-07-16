import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { FcGoogle } from 'react-icons/fc';

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
        <div className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
            <Helmet>
                <title>Login | Home</title>
            </Helmet>

            <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 w-full max-w-sm transition-all duration-300 hover:shadow-3xl">
                <h2 className="text-center text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">
                    Welcome Back
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="input input-bordered w-full mt-1"
                            placeholder="********"
                            required
                        />
                    </div>

                    <div className="text-right text-sm">
                        <button type="button" onClick={handleForgotPassword} className="text-blue-600 dark:text-blue-400 hover:underline">
                            Forgot password?
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button type="submit" className="btn bg-gradient-to-r from-teal-500 to-cyan-500 text-white w-full">
                        Login
                    </button>
                </form>

                <div className="divider my-4">OR</div>

                <button
                    onClick={handleGoogleLogin}
                    className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                    Don’t have an account?{' '}
                    <Link className="text-blue-600 dark:text-blue-400 hover:underline font-medium" to="/auth/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
