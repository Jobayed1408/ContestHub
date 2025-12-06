
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})



const useAxios = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate() 
    useEffect(()=>{
        const requestInterceptors =axiosSecure.interceptors.request.use( (config) => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config 
        })

        const restInterceptors =axiosSecure.interceptors.response.use( (response) => {
            return response
        }, (error) => {
            console.log(error)

            const errorStatus = error.status
            if(errorStatus === 401 || errorStatus === 403 )
            {
                logout()
                .then(()=>{
                    navigate('/login')
                })
            }

            return Promise.reject(error);
        })


        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptors)
            axiosSecure.interceptors.request.eject(restInterceptors)
        }
    },[user, logout, navigate])

    return (

        axiosSecure

    );
};

export default useAxios;