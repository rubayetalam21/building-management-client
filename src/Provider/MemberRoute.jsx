// routes/MemberRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import useUserRole from '../hooks/useUserRole';

const MemberRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const {role, isRoleLoading} = useUserRole(user?.email);
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (user && role === 'member') {
        return children;
    }

    // Redirect to unauthorized or home page
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default MemberRoute;
