import React from 'react';
import { Outlet } from 'react-router';
import Dashboard from '../pages/Dashboard/Dashboard';

const DashboardLayout = () => {
    return (
        <div>
            <Dashboard></Dashboard> 
            <Outlet></Outlet>
        </div>
    );
};

export default DashboardLayout;