import React from 'react';
import { Outlet } from 'react-router';

const Admin = () => {
    return (
        <div>
            Admin
            <Outlet></Outlet>
        </div>
    );
};

export default Admin;