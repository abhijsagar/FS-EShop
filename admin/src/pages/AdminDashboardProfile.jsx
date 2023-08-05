import React from 'react';
import AdminSideBar from '../components/Layout/AdminSideBar';
import AdminHeader from '../components/Layout/AdminHeader';
import AdminProfileContent from '../components/AdminProfileContent';

const AdminDashboardProfile = () => {
    return (
        <div>
            <AdminHeader />
            <div className='w-full flex'>
                <div className='flex items-start justify-between w-full'>
                    <div className='w-[80px] 800px:w-[330px]'>
                        <AdminSideBar active={8} />
                    </div>
                    <AdminProfileContent />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardProfile;
