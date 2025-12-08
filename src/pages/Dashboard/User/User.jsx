import React from 'react';
import { Outlet } from 'react-router';

const User = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default User;