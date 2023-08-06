import React from 'react';
import AllCategory from '../components/AllCategory';
import AdminSideBar from '../components/Layout/AdminSideBar';
import AdminHeader from '../components/Layout/AdminHeader';

const AdminDashboardCategory = () => {
    return (
        <div>
            <AdminHeader />
            <div className='w-full flex'>
                <div className='flex items-start justify-between w-full'>
                    <div className='w-[80px] 800px:w-[330px]'>
                        <AdminSideBar active={7} />
                    </div>
                    <AllCategory />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardCategory;
