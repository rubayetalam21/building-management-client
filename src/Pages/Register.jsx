import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Register = () => {
    const { createUser, setUser, updateUser } = useContext(AuthContext);
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
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
            setNameError("Name should be more than 5 characters");
            return;
        } else {
            setNameError("");
        }

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!hasUppercase || !hasLowercase || !isLongEnough) {
            setPasswordError(
                "Password must contain at least 1 uppercase letter, 1 lowercase letter, and be at least 6 characters long."
            );
            return;
        } else {
            setPasswordError("");
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration',
                            text: 'You have been successfully registered!',
                        });
                        navigate("/");
                    })
                    .catch((error) => {
                        setUser(user);
                    });
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="flex justify-center min-h-screen items-center">
            <Helmet>
                <title>Home | Register </title>
            </Helmet>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className="font-semibold text-2xl text-center">Register your account</h2>
                <form onSubmit={handleRegister} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input name="name" type="text" className="input" placeholder="Name" required />
                        {nameError && <p className="text-xs text-error">{nameError}</p>}

                        <label className="label">Photo URL</label>
                        <input name="photo" type="text" className="input" placeholder="Photo URL" required />

                        <label className="label">Email</label>
                        <input name="email" type="email" className="input" placeholder="Email" required />

                        <label className="label">Password</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="input w-full pr-10"
                                placeholder="Password"
                                required
                            />
                            <span
                                className="absolute right-3 top-3 text-xl cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </span>
                        </div>
                        {passwordError && <p className="text-xs text-error">{passwordError}</p>}

                        <button type="submit" className="btn btn-neutral mt-4">Register</button>

                        <p className="font-semibold text-center pt-5">
                            Already have an account?{" "}
                            <Link className="text-secondary" to="/auth/login">Login</Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;