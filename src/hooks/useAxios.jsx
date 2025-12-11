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

    useEffect(() => {
        
        // 1. Request Interceptor (Adding the Auth Header)
        const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
            // Check if user and accessToken exist before adding header
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        // 2. Response Interceptor (Handling 401/403 Errors)
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response; // Success: return response
            }, 
            (error) => {
                // --- 🛑 THIS IS WHERE THE BUG IS ---
                // The status code is on error.response, not error
                const errorStatus = error.response ? error.response.status : null; 
                
                console.log('Error Status:', errorStatus, 'Error Response:', error.response);

                // If the error status is 401 (Unauthorized) or 403 (Forbidden)
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

                return Promise.reject(error); // Reject the promise so the component can handle the error
            }
        );

        // Cleanup: Eject interceptors when the component unmounts
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            // ❌ Fix 1: You were using restInterceptors name for request interceptor eject
            // ❌ Fix 2: You were ejecting a request interceptor twice.
            axiosSecure.interceptors.response.eject(responseInterceptor); 
        }
    // Linter requires dependencies: user is fine, but logout/navigate are stable, so they might not be needed depending on your linting setup.
    }, [user, logout, navigate]) 

    return axiosSecure;
};

export default useAxios;