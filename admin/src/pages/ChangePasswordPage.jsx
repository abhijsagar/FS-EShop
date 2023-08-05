import React from 'react';
import AdminSideBar from '../components/Layout/AdminSideBar';
import AdminHeader from '../components/Layout/AdminHeader';
import ChangePassword from '../components/ChangePassword/ChangePassword';

const ChangePasswordPage = () => {
    return (
        <div>
            <AdminHeader />
            <div className='w-full flex'>
                <div className='flex items-start justify-between w-full'>
                    <div className='w-[80px] 800px:w-[330px]'>
                        <AdminSideBar active={8} />
                    </div>
                    <ChangePassword />
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
