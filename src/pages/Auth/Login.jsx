import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin ';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const {
        register,
        handleSubmit,
        setValue, // Added to programmatically fill fields
        formState: { errors },
    } = useForm();

    const handleLogin = (data) => {
        loginUser(data.email, data.password)
            .then(() => {
                toast.success('Login successfully');
                navigate(location?.state?.from || '/');
            })
            .catch(err => {
                console.error(err);
                toast.error(err.message || 'Failed to login. Please try again.');
            });
    };

    // Helper to fill demo data
    const fillDemo = (email, password) => {
        setValue('email', email);
        setValue('password', password);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <h2 className='text-center text-4xl font-extrabold mb-8 tracking-tight opacity-90'>
                Login First!!
            </h2>

            <div className="hero">
                <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-base-100 bg-opacity-10 backdrop-blur-xl border border-white/10 rounded-3xl">
                    <div className="card-body p-8">

                        {/* Demo Credentials Section */}
                        

                        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold opacity-70 ml-1">Email</label>
                                <input
                                    type="email"
                                    {...register('email', { required: 'Email is required.' })}
                                    className="input input-bordered bg-transparent border-opacity-20 focus:outline-none focus:border-opacity-100 transition-all"
                                    placeholder="name@example.com"
                                />
                                {errors.email && (
                                    <p className="text-error text-xs mt-1 ml-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold opacity-70 ml-1">Password</label>
                                <input
                                    type="password"
                                    {...register('password', { required: "Password is required" })}
                                    className="input input-bordered bg-transparent border-opacity-20 focus:outline-none focus:border-opacity-100 transition-all"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="text-error text-xs mt-1 ml-1">{errors.password.message}</p>
                                )}
                            </div>

                            <button className="btn btn-outline border-primary border-2 mt-4 text-white hover:bg-opacity-90 w-full rounded-xl">
                                Login
                            </button>
                        </form>
                        <div className="flex flex-col gap-2 my-3">
                            <span className="text-[10px] uppercase tracking-widest opacity-50 text-center">Quick Access Demo</span>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => fillDemo('user2@gmail.com', 'User2@gmail.com')}
                                    className="btn btn-xs btn-outline opacity-70 hover:opacity-100">
                                    User Demo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => fillDemo('admin1@gmail.com', 'Admin1@gmail.com')}
                                    className="btn btn-xs btn-outline opacity-70 hover:opacity-100">
                                    Admin Demo
                                </button>
                            </div>
                        </div>

                        <div className="divider opacity-20 my-2">OR</div>

                        <SocialLogin />

                        <p className='text-center text-sm opacity-80'>
                            Don't have an account?
                            <Link to={'/register'} className='ml-2 font-bold text-primary underline underline-offset-4 hover:opacity-100 transition-opacity'>
                                Sign Up
                            </Link>
                        </p>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    );
};

export default Login;