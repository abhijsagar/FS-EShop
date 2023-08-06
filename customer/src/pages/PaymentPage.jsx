import React, { useEffect, useState } from 'react';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import Payment from '../components/Payment/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { server } from '../server';
import Breadcrumbs from '../components/Layout/Breadcrumbs';

const PaymentPage = () => {
    const [stripeApikey, setStripeApiKey] = useState('');

    async function getStripeApikey() {
        const { data } = await axios.get(`${server}/payment/stripeapikey`);
        setStripeApiKey(data.stripeApikey);
    }

    useEffect(() => {
        getStripeApikey();
    }, []);

    return (
        <Elements stripe={loadStripe(stripeApikey)}>
            <div className='max-w-container lg:mx-auto w-[96%] mx-[2%] px-4'>
                <Breadcrumbs title='Continue Payment' />
                <div className=''>
                    <CheckoutSteps active={2} />
                    <Payment />
                </div>
            </div>
        </Elements>
    );
};

export default PaymentPage;
