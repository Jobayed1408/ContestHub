import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loader></Loader>
    }

    if (role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AdminRoute;