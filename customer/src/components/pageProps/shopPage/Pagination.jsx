import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import ProductGridView from '../../home/Products/ProductGridView';
import ProductListView from '../../home/Products/ProductListView';

const Pagination = ({ itemsView, sortType, perPage }) => {
    const { allProducts } = useSelector((state) => state.products);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemStart, setItemStart] = useState(1);

    const endOffset = itemOffset + perPage;
    const pageCount = Math.ceil(allProducts.length / perPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * perPage) % allProducts.length;
        setItemOffset(newOffset);
        setItemStart(newOffset);
    };

    let currentItems = [];
    currentItems = allProducts.slice(itemOffset, endOffset);
    if (sortType === 'bestSellers') {
        currentItems?.sort((a, b) => b.sold_out - a.sold_out);
    } else if (sortType === 'newArrival') {
        currentItems?.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortType === 'featured') {
        currentItems?.sort((a, b) => b.stock - a.stock);
    } else if (sortType === 'finalOffer') {
        currentItems?.sort((a, b) => (b.originalPrice - b.discountPrice) / b.originalPrice - (a.originalPrice - a.discountPrice) / a.originalPrice);
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10'>
                {itemsView === 'grid' &&
                    currentItems &&
                    currentItems.map((item, index) => (
                        <div key={item._id} className='w-full'>
                            <ProductGridView data={item} key={index} />
                        </div>
                    ))}
            </div>
            <div className='w-full gap-10 mdl:gap-4 lg:gap-10'>
                {itemsView === 'list' &&
                    currentItems &&
                    currentItems.map((item, index) => (
                        <div key={item._id} className='w-full'>
                            <ProductListView data={item} key={index} />
                        </div>
                    ))}
            </div>
            <div className='flex flex-col mdl:flex-row justify-center mdl:justify-between items-center'>
                <ReactPaginate
                    nextLabel=''
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel=''
                    pageLinkClassName='w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center'
                    pageClassName='mr-6'
                    containerClassName='flex text-base font-semibold font-titleFont py-10'
                    activeClassName='bg-black text-white'
                />
                <p className='text-base font-normal text-lightText'>
                    Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of {allProducts.length}
                </p>
            </div>
        </div>
    );
};

export default Pagination;
