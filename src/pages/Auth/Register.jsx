import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import SocialLogin from './SocialLogin ';
import { toast } from 'react-toastify';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, userProfileUpdate } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxios();

    const handleRegistration = (data) => {
        const profileImg = data.photo[0];
        registerUser(data.email, data.password)
            .then(() => {
                const formData = new FormData();
                formData.append('image', profileImg);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_url}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    toast.success('Registered successfully');
                                }
                            })

                        const userProfile = { displayName: data.name, photoURL: photoURL }
                        userProfileUpdate(userProfile)
                            .then(() => {
                                toast.success('Update profile successfully')
                                navigate(location.state || '/');
                            })
                            .catch(error => console.log(error))
                    })
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="card w-full max-w-md shadow-2xl bg-base-100 bg-opacity-10 backdrop-blur-2xl border border-white/10 rounded-3xl">
                
                <div className="pt-10 px-8 text-center ">
                    <h3 className="text-3xl font-bold tracking-tight opacity-90 text-white">Create Account</h3>
                    <p className='mt-2 opacity-50 text-gray-400 text-sm'>Join Contest HUB today</p>
                </div>

                <form className="card-body gap-4 p-8" onSubmit={handleSubmit(handleRegistration)}>
                    
                    {/* Name Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold opacity-70 ml-1 text-gray-300">Full Name</label>
                        <input type="text"
                            {...register('name', { required: true })}
                            className="input input-bordered text-gray-300 bg-transparent border-opacity-20 focus:outline-none focus:border-opacity-100 w-full"
                            placeholder="Enter your name" />
                        {errors.name && <span className='text-error text-xs ml-1 '>Name is required</span>}
                    </div>

                    {/* Photo Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold opacity-70 ml-1 text-gray-300">Profile Picture</label>
                        <input type="file" 
                            {...register('photo', { required: true })} 
                            className="file-input text-gray-300 file-input-bordered bg-transparent border-opacity-20 w-full" 
                        />
                        {errors.photo && <span className='text-error text-xs ml-1'>Photo is required</span>}
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold opacity-70 ml-1 text-gray-300">Email Address</label>
                        <input type="email" 
                            {...register('email', { required: true })} 
                            className="input text-gray-300 input-bordered bg-transparent border-opacity-20 focus:outline-none focus:border-opacity-100 w-full" 
                            placeholder="email@example.com" />
                        {errors.email && <span className='text-error text-xs ml-1'>Email is required</span>}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold opacity-70 ml-1 text-gray-300">Password</label>
                        <input type="password" 
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                            })} 
                            className="input text-gray-300 input-bordered bg-transparent border-opacity-20 focus:outline-none focus:border-opacity-100 w-full" 
                            placeholder="••••••••" />
                        {errors.password && <span className='text-error text-xs ml-1 leading-tight'>Password needs 6+ chars, a number & symbol</span>}
                    </div>

                    <button className="btn btn-outline border-primary border-2 mt-4 text-white hover:bg-opacity-90 w-full rounded-xl">
                        Register
                    </button>
                </form>

                <div className="px-8 pb-10">
                    <div className="divider opacity-70 text-white px-4">OR</div>
                    <SocialLogin />
                    <p className='text-center text-gray-200 mt-8 text-sm opacity-60'>
                        Already have an account? 
                        <Link
                            state={location.state}
                            className='ml-2 font-bold text-primary underline underline-offset-4 hover:opacity-100 transition-opacity'
                            to="/login">Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;