import React from '../../../../01admin/node_modules/@types/react';
import ShopSettings from '../../components/Shop/ShopSettings';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';

const ShopSettingsPage = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex items-start justify-between w-full'>
                <div className='w-[80px] 800px:w-[330px]'>
                    <DashboardSideBar active={11} />
                </div>
                <ShopSettings />
            </div>
        </div>
    );
};

export default ShopSettingsPage;
