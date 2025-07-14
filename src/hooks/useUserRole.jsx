import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider'; // adjust path as needed

const useUserRole = () => {
    const { user } = useContext(AuthContext);

    const {
        data: role = null,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        enabled: !!user?.email,
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://b11a12-server-side-rubayetalam21.vercel.app/users/role/${user.email}`);
            if (!res.ok) throw new Error('Failed to fetch user role');
            const data = await res.json();
            return data.role;
        },
    });

    return { role, isLoading, isError, refetch };
};

export default useUserRole;
