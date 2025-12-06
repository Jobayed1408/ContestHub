import { useMutation } from '@tanstack/react-query';
import useAxios from './useAxios';

export const useRegisterUser = () => {
  const axiosPublic = useAxios();

  return useMutation({
    mutationFn: async (userInfo) => {
      const res = await axiosPublic.post('/users', userInfo);
      return res.data;
    },
  });
};
