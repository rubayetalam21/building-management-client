import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import useUserRole from '../hooks/useUserRole';

const UserRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { role, isLoading: isRoleLoading } = useUserRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (user && role === 'user') {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default UserRoute;
