import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
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
                navigate(location.state || "/");
            })
            .catch((error) => {
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
                navigate(location.state || "/");
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
        <div className="flex justify-center min-h-screen items-center px-4">
            <Helmet>
                <title>Home | Login </title>
            </Helmet>
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5 px-4">
                <h2 className="font-semibold text-2xl text-center">Login to your account</h2>
                <form onSubmit={handleLogin} className="card-body px-0">
                    <label className="label">Email</label>
                    <input
                        name="email"
                        type="email"
                        className="input input-bordered w-full"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="label">Password</label>
                    <input
                        name="password"
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="Password"
                        required
                    />

                    <div className="text-sm text-right">
                        <button type="button" onClick={handleForgotPassword} className="text-blue-600 underline">
                            Forgot password?
                        </button>
                    </div>

                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

                    <button type="submit" className="btn btn-neutral mt-4 w-full">
                        Login
                    </button>
                </form>

                {/* Google login button */}
                <div className="mt-4 text-center">
                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full flex items-center justify-center gap-2"
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>
                </div>

                <p className="font-semibold text-center pt-5">
                    Don’t have an account?{" "}
                    <Link className="text-blue-600 underline" to="/auth/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;