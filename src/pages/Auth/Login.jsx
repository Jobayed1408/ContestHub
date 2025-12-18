import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin ';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {


    const location = useLocation();
    const navigate = useNavigate();
    const { loginUser } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

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
    }


    return (
        <div>
            <h2 className='text-center text-3xl my-5'>Login First!!</h2>

            <div className="hero  ">

                <div className="card  w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <fieldset className="fieldset">
                                <div>
                                    <label className="label">Email</label>
                                    <input type="email"
                                        {...register('email', {
                                            required: 'Email is required.'

                                        })}
                                        className="input text-gray-600" placeholder="Email" />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                                    )}
                                </div>


                                <div>
                                    <label className="label">Password</label>
                                    <input type="password"
                                        {...register('password', {
                                            required: "Password is required",

                                        })}
                                        className="input text-gray-600"
                                        placeholder="Password" />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                                    )}
                                </div>


                                <button className="btn btn-neutral mt-4" type="submit">Login</button>
                            </fieldset>
                        </form>
                        <SocialLogin></SocialLogin>
                        <p className='text-center'>Don't have an account? <Link to={'/register'}
                        
                        className='text-blue-400 underline'
                        >Sign Up</Link></p>
                            
                    </div>
                    
                </div>

            </div>

        </div>
    );
};

export default Login;