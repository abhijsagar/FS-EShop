import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard';
import Ratings from '../ProductDetails/Ratings';

const ProductCard = ({ data, isEvent }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
                <div className='flex justify-end'></div>
                <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
                    <img src={`${data.images && data.images[0]?.url}`} alt='' className='w-full h-[170px] object-contain' />
                </Link>
                <Link to={`/shop/preview/${data?.shop._id}`}>
                    <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
                </Link>
                <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
                    <h4 className='pb-3 font-[500]'>{data.name.length > 40 ? data.name.slice(0, 40) + '...' : data.name}</h4>

                    <div className='flex'>
                        <Ratings rating={data?.ratings} />
                    </div>

                    <div className='py-2 flex items-center justify-between'>
                        <div className='flex'>
                            <h5 className={`${styles.productDiscountPrice}`}>{data.originalPrice === 0 ? data.originalPrice : data.discountPrice}$</h5>
                            <h4 className={`${styles.price}`}>{data.originalPrice ? data.originalPrice + ' $' : null}</h4>
                        </div>
                        <span className='font-[400] text-[17px] text-[#68d284]'>{data?.sold_out} sold</span>
                    </div>
                </Link>

                {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
            </div>
        </>
    );
};

export default ProductCard;
