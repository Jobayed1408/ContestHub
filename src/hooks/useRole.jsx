import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios(); 

    const { isLoading: roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            
            return res.data?.role || 'user';
        }
    })

    return { role, roleLoading };
};

export default useRole;