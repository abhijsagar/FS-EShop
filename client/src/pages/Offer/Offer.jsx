import React, { useState } from 'react';
import Breadcrumbs from '../../components/Layout/Breadcrumbs';
import Loader from '../../components/Layout/Loader';
import OfferCard from './OfferCard';
import { useSelector } from 'react-redux';

const Offer = () => {
    const [prevLocation] = useState('');
    const { allEvents, isLoading } = useSelector((state) => state.events);

    return (
        <div className='max-w-container mx-auto'>
            <Breadcrumbs title='Best Deals' prevLocation={prevLocation} />
            <div className='pb-10'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <OfferCard active={true} data={allEvents && allEvents[0]} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Offer;
