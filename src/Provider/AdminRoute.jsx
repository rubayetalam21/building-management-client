import { Navigate } from 'react-router-dom';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = ({ children }) => {
    const { role, isLoading } = useUserRole();

    if (isLoading) return <p>Loading...</p>;

    return role === 'admin' ? children : <Navigate to="/unauthorized" />;
};

export default AdminRoute;
