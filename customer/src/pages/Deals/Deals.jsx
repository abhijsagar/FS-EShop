import React, { useState } from 'react';
import Breadcrumbs from '../../components/Layout/Breadcrumbs';
import BestSellers from '../../components/home/BestSellers/BestSellers';

const Deals = () => {
    const [prevLocation] = useState('');

    return (
        <div className='max-w-container w-[96%] mx-[2%] px-4 lg:mx-auto'>
            <Breadcrumbs title='Deals' prevLocation={prevLocation} />
            <div className='pb-10'>
                <BestSellers />
            </div>
        </div>
    );
};

export default Deals;
