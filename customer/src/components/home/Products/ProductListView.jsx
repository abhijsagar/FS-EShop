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

const ProductListView = ({ data, isEvent }) => {
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
            <div className='w-full max-w-60 max-h-60 flex mb-4 border py-2'>
                <div className='flex justify-start w-[28%] items-center'>
                    <Link to={`${isEvent === true ? `/shop/${data?._id}?isEvent=true` : `/shop/${data?._id}`}`}>
                        <Image className='w-full pl-4 h-52' imgSrc={data?.images && data?.images[0]?.url} />
                    </Link>
                    <div className='absolute top-6 left-8'>
                        <Badge text='New' />
                    </div>
                </div>
                <div className='w-[72%] flex items-center justify-between py-4 lgl:py-0 px-4 lgl:px-0 gap-6 lgl:gap-0'>
                    <div className='w-full py-4 flex flex-col gap-1 px-4'>
                        <div className='flex flex-col w-full justify-between font-titleFont mt-2'>
                            <p className='text-[#767676] text-[14px]'>{data?.shop.name}</p>
                            <h2 className='text-lg text-primeColor font-bold my-2'>{data?.name}</h2>
                            <Ratings rating={data?.ratings} />
                        </div>
                        <div className='flex items-center justify-between font-titleFont mt-2 mb-2'>
                            <div className='w-40'>
                                <span className='text-[#767676] text-[18px] mr-2'>
                                    &#8377; {data?.originalPrice === 0 ? data?.originalPrice : data?.discountPrice}
                                </span>
                                <span className='text-[#767676] text-[14px]'>{data?.originalPrice ? <>&#8377; {data?.originalPrice}</> : null}</span>
                            </div>
                            <span className='font-[400] text-[17px] text-[#68d284]'>{data?.sold_out} sold</span>
                        </div>
                        <ul className='w-full h-full flex items-center justify-between gap-2 font-titleFont px-2'>
                            <li
                                onClick={() => addToCartHandler(data?._id)}
                                className='text-[#767676] hover:text-primeColor text-sm font-normal hover:border-b-primeColor flex items-center justify-start gap-2 hover:cursor-pointer pb-1 duration-300 w-full'>
                                Add to Cart
                                <span>
                                    <FaShoppingCart />
                                </span>
                            </li>
                            <li
                                onClick={() => setOpen(!open)}
                                className='text-[#767676] hover:text-primeColor text-sm font-normal hover:border-b-primeColor flex items-center justify-center gap-2 hover:cursor-pointer pb-1 duration-300 w-full'>
                                View Details
                                <span className='text-lg'>
                                    <MdOutlineLabelImportant />
                                </span>
                            </li>
                            {click ? (
                                <li
                                    onClick={() => removeFromWishlistHandler(data)}
                                    className='text-[#767676] hover:text-primeColor text-sm font-normal hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full'>
                                    Remove from wishlist
                                    <span>
                                        <BsSuitHeartFill color={click ? 'red' : '#333'} />
                                    </span>
                                </li>
                            ) : (
                                <li
                                    onClick={() => addToWishlistHandler(data)}
                                    className='text-[#767676] hover:text-primeColor text-sm font-normal hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full'>
                                    Add to Wishlist
                                    <span>
                                        <BsSuitHeartFill color={click ? 'red' : '#333'} />
                                    </span>
                                </li>
                            )}
                        </ul>{' '}
                    </div>
                </div>
            </div>
            {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
    );
};

export default ProductListView;
