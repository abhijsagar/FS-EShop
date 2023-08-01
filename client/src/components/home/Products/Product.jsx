import React, { useEffect, useState } from 'react';
import { BsSuitHeartFill } from 'react-icons/bs';
import { GiReturnArrow } from 'react-icons/gi';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineLabelImportant } from 'react-icons/md';
import Image from '../../designLayouts/Image';
import Badge from './Badge';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Ratings from '../../Products/Ratings';
import { addToWishlist, removeFromWishlist } from '../../../redux/slices/wishlistSlice';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/slices/cartSlice';
import ProductDetailsCard from '../../Route/ProductDetailsCard/ProductDetailsCard';

const Product = ({ data, isEvent }) => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (wishlist && wishlist.find((i) => i._id === data?._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist]);

    const removeFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    };

    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data));
    };

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);
        if (isItemExists) {
            toast.error('Item already in cart!');
        } else {
            if (data?.stock < 1) {
                toast.error('Product stock limited!');
            } else {
                const cartData = { ...data, qty: 1 };
                dispatch(addToCart(cartData));
                toast.success('Item added to cart successfully!');
            }
        }
    };

    return (
        <div className='w-full relative group'>
            <div className='max-w-80 max-h-80 relative overflow-y-hidden '>
                <Link to={`${isEvent === true ? `/shop/${data?._id}?isEvent=true` : `/shop/${data?._id}`}`}>
                    <Image className='w-full h-full' imgSrc={data?.images && data?.images[0]?.url} />
                </Link>
                <div className='absolute top-6 left-8'>
                    <Badge text='New' />
                </div>
                <div className='w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700'>
                    <ul className='w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r'>
                        <li className='text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pt-3 pb-1 duration-300 w-full'>
                            Compare
                            <span>
                                <GiReturnArrow />
                            </span>
                        </li>
                        <li
                            onClick={() => addToCartHandler(data?._id)}
                            className='text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full'>
                            Add to Cart
                            <span>
                                <FaShoppingCart />
                            </span>
                        </li>
                        <li
                            onClick={() => setOpen(!open)}
                            className='text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full'>
                            View Details
                            <span className='text-lg'>
                                <MdOutlineLabelImportant />
                            </span>
                        </li>
                        {click ? (
                            <li
                                onClick={() => removeFromWishlistHandler(data)}
                                className='text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full'>
                                Remove from wishlist
                                <span>
                                    <BsSuitHeartFill color={click ? 'red' : '#333'} />
                                </span>
                            </li>
                        ) : (
                            <li
                                onClick={() => addToWishlistHandler(data)}
                                className='text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full'>
                                Add to Wish List
                                <span>
                                    <BsSuitHeartFill color={click ? 'red' : '#333'} />
                                </span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className='max-w-80 py-4 flex flex-col gap-1 border-[1px] border-t-0 px-4'>
                <div className='flex flex-col justify-between font-titleFont mt-2'>
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                        <p className='text-[#767676] text-[14px]'>{data?.shop.name}</p>
                    </Link>
                    <h2 className='text-lg text-primeColor font-bold my-2'>{data?.name.length > 45 ? data?.name.slice(0, 45) + '...' : data?.name}</h2>
                    <Ratings rating={data?.ratings} />
                </div>
                <div className='flex items-center justify-between font-titleFont mt-2 mb-2'>
                    <div className='w-40'>
                        <span className='text-[#767676] text-[18px] mr-2'>${data?.originalPrice === 0 ? data?.originalPrice : data?.discountPrice}</span>
                        <span className='text-[#767676] text-[14px]'>{data?.originalPrice ? '$ ' + data?.originalPrice : null}</span>
                    </div>
                    <span className='font-[400] text-[17px] text-[#68d284]'>{data?.sold_out} sold</span>
                </div>
            </div>
            {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
    );
};

export default Product;
