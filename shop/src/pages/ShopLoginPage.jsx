import React, { useEffect } from '../../../01admin/node_modules/@types/react';
import { useSelector } from '../../../01admin/node_modules/react-redux/es';
import { useNavigate } from '../../../01admin/node_modules/react-router-dom/dist';
import ShopLogin from '../components/Shop/ShopLogin';

const ShopLoginPage = () => {
    const navigate = useNavigate();
    const { isSeller, isLoading } = useSelector((state) => state.seller);

    useEffect(() => {
        if (isSeller === true) {
            navigate(`/dashboard`);
        }
    }, [isLoading, isSeller]);
    return (
        <div>
            <ShopLogin />
        </div>
    );
};

export default ShopLoginPage;
