import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import useUserRole from '../hooks/useUserRole';

const UserRoute = ({ children }) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const { role, isLoading: roleLoading } = useUserRole();
    const location = useLocation();

    // Show loading until both user and role are loaded
    if (authLoading || roleLoading) {
        return <div className="text-center py-10">Loading user access...</div>;
    }

    // Allow access only if role is strictly 'user'
    if (user && role === 'user') {
        return children;
    }

    // Redirect unauthorized access
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default UserRoute;
