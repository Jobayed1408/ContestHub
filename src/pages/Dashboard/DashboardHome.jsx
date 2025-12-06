import React from 'react';
import Admin from './Admin/Admin';
import Creator from './Creator/Creator';
import User from './User/USer';
import useRole from '../../hooks/useRole';
import Loader from '../../Components/Loader/Loader';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loader></Loader>
    }
    if (role === 'admin') {
        return <Admin></Admin>
    }
    else if (role === 'creator') {
        return <Creator></Creator>
    }
    else {
        return <User></User>
    }
};
export default DashboardHome;