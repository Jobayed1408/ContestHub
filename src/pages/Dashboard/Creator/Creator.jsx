import React from 'react';
import { Outlet } from 'react-router';

const Creator = () => {
    return (
        <div>
            Creator
            <Outlet></Outlet>
        </div>
    );
};

export default Creator;