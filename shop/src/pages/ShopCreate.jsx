import React, { useEffect } from '../../../01admin/node_modules/@types/react';
import { useSelector } from '../../../01admin/node_modules/react-redux/es';
import { useNavigate } from '../../../01admin/node_modules/react-router-dom/dist';
import ShopCreate from '../components/Shop/ShopCreate';

const ShopCreatePage = () => {
    const navigate = useNavigate();
    const { isSeller, seller } = useSelector((state) => state.seller);

    useEffect(() => {
        if (isSeller === true) {
            navigate(`/shop/${seller._id}`);
        }
    }, []);
    return (
        <div>
            <ShopCreate />
        </div>
    );
};

export default ShopCreatePage;
