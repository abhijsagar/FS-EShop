import React, { useState } from 'react';
import Breadcrumbs from '../../components/Layout/Breadcrumbs';
import Pagination from '../../components/pageProps/shopPage/Pagination';
import ProductBanner from '../../components/pageProps/shopPage/ProductBanner';
import ShopSideNav from '../../components/pageProps/shopPage/ShopSideNav';

const Shop = () => {
    const [prevLocation] = useState('');
    const [itemsView, setItemsView] = useState('grid');
    const [sortType, setsortType] = useState('bestSellers');
    const [filterBy, setFilterBy] = useState({ type: '', value: '' });
    const [perPage, setPerPage] = useState(12);

    const setPageView = (view) => {
        setItemsView(view);
    };

    const itemsPerPage = (itemsPerPage) => {
        setPerPage(itemsPerPage);
    };

    const sortBy = (type) => {
        setsortType(type);
    };

    return (
        <div className='max-w-container lg:mx-auto w-[96%] mx-[2%] px-4'>
            <Breadcrumbs title='Products' prevLocation={prevLocation} />
            <div className='w-full h-full flex pb-20 gap-10'>
                <div className='w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full'>
                    <ShopSideNav setFilterBy={setFilterBy} />
                </div>
                <div className='w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10'>
                    <ProductBanner itemsPerPage={itemsPerPage} filterBy={filterBy} sortBy={sortBy} setPageView={setPageView} />
                    <Pagination perPage={perPage} sortType={sortType} itemsView={itemsView} filterBy={filterBy} />
                </div>
            </div>
        </div>
    );
};

export default Shop;
