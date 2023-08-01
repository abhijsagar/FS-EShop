import React from 'react';

import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import Checkout from '../components/Checkout/Checkout';
import Breadcrumbs from '../components/Layout/Breadcrumbs';
const CheckoutPage = () => {
    return (
        <div className='max-w-container mx-6 px-4'>
            <Breadcrumbs title='Shipping Address' />
            <div className='pb-10'>
                <CheckoutSteps active={1} />
                <Checkout />
            </div>
        </div>
    );
};

export default CheckoutPage;
