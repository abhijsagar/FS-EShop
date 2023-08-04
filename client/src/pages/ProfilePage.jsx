import React, { useState } from 'react';
import styles from '../styles/styles';
import Loader from '../components/Layout/Loader';
import ProfileSideBar from '../components/Profile/ProfileSidebar';
import ProfileContent from '../components/Profile/ProfileContent';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
    const location = useLocation();
    const { loading } = useSelector((state) => state.user);
    const [active, setActive] = useState(location?.state?.active || 1);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div className={`${styles.section} flex py-10`}>
                    <div className='w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-4 mr-4'>
                        <ProfileSideBar active={active} setActive={setActive} />
                    </div>
                    <ProfileContent active={active} />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
