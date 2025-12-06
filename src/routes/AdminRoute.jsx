import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loader></Loader>
    }

    if (role !== 'admin') {
        return <div>
            You cannot access.
        </div>
    }

    return children;
};

export default AdminRoute;