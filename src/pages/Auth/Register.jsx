import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const Register = () => {

    const IMG_API_KEY = import.meta.env.VITE_image_url;
    const IMG_UPLOAD_URL = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`;

    

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm()

    const { registerUser, userProfileUpdate, signInWithGoogle } = useAuth()

    const googleLogin = () => {
        signInWithGoogle()
        .then(res => console.log(res.user))
        .catch(err => console.log(err))
    }

    const handleRegistration = async (data) => {
        console.log("After register", data.photo[0])

        const profileImg = data.photo[0];
        registerUser(data.email, data.password)
            .then(res => {
                console.log(res)

                const formData = new FormData();
                formData.append("image", profileImg);

                // 2. Upload image to imgbb
                axios.post(IMG_UPLOAD_URL, formData)
                    .then(res => {
                        console.log(res.data)
                        const updateProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }
                        userProfileUpdate(updateProfile)
                            .then(res => console.log('User profile updateDoc.'))
                            .catch(err => console.log(err))
                    })
            })
            .catch(err => console.log(err))

    }

    // const onSubmit = (data) => console.log(data) 
    return (

        <div>
            <h2 className='text-center text-3xl my-5'>Register First!!</h2>

            <div className="hero  ">

                <div className="card  w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handleRegistration)}>
                            <fieldset className="fieldset">
                                <div className=''>
                                    <label className="label">Name</label>
                                    <input type="text"
                                        {...register('name', { required: "Name is required." })}
                                        className="input text-gray-600" placeholder="Name" />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="label">Photo Url</label>
                                    <input type="file"
                                        {...register('photo')}
                                        className="file-input file-input-ghost" />
                                </div>


                                <div>
                                    <label className="label">Email</label>
                                    <input type="email"
                                        {...register('email', {
                                            required: 'Email is required.',
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: 'Invalid email format'
                                            }
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
                                            minLength: {
                                                value: 6,
                                                message: 'Minimum 6 characters. '
                                            }
                                        })}
                                        className="input text-gray-600"
                                        placeholder="Password" />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                                    )}
                                </div>


                                <button className="btn btn-neutral mt-4" type="submit">Register</button>

                                {/* Google */}
                            </fieldset>
                                <button 
                                onClick={googleLogin}
                                className="btn mt-4 border-[#e5e5e5]">
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Register with Google
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;