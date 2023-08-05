import React from 'react';
import logo from '../../assests/images/logo.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
            <div className='flex items-center justify-between w-full'>
                <div className='flex ml-4'>
                    <Link to='/admin-dashboard'>
                        <img src={logo} alt='' className='w-[60px] h-[60px] object-cover' />
                    </Link>
                </div>
                <div className='flex mr-4'>
                    <Link to='/admin-profile'>
                        <img src={`${user?.avatar?.url}`} alt='' className='w-[60px] h-[60px] rounded-full object-cover' />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
