import React, { useState } from 'react';
import Breadcrumbs from '../../components/Layout/Breadcrumbs';
import Loader from '../../components/Layout/Loader';
import OfferCard from './OfferCard';
import { useSelector } from 'react-redux';

const Offer = () => {
    const [prevLocation] = useState('');
    const { allEvents, isLoading } = useSelector((state) => state.events);

    return (
        <div className='max-w-container mx-6'>
            <Breadcrumbs title='Best Deals' prevLocation={prevLocation} />
            <div className='pb-10'>
                {isLoading ? <Loader /> : <div>{allEvents && allEvents.map((item, index) => index < 2 && <OfferCard active={true} data={item} />)}</div>}
            </div>
        </div>
    );
};

export default Offer;
