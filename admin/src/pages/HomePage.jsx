import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Layout/Loader.jsx';

const HomePage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/admin-dashboard');
        }
    }, [isAuthenticated]);

    return <Loader />;
};

export default HomePage;
