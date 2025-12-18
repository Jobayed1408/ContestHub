import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://contest-hub-server-steel.vercel.app'
})

const useAxios = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        
        const requestInterceptor = axiosSecure.interceptors.request.use((config) => {

            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response; 
            }, 
            (error) => {
                const errorStatus = error.response ? error.response.status : null; 
                
                console.log('Error Status:', errorStatus, 'Error Response:', error.response);

               
                if (errorStatus === 401 || errorStatus === 403) {
                    console.log('Token expired or unauthorized access. Logging out...');
                    logout()
                    .then(() => {
                        navigate('/login');
                    })
                    .catch(err => {
                        console.error("Logout failed:", err);
                    });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            
            axiosSecure.interceptors.response.eject(responseInterceptor); 
        }
        
    }, [user, logout, navigate]) 

    return axiosSecure;
};

export default useAxios;