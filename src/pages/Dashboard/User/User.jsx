import React from 'react';
import { Outlet } from 'react-router';

const User = () => {
    return (
        <div>
            User Normal
            <Outlet></Outlet>
        </div>
    );
};

export default User;