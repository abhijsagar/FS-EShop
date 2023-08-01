import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { BsCartPlus } from 'react-icons/bs';
import styles from '../../styles/styles';
import { AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { emptyCart } from '../../assets/images';
import { motion } from 'framer-motion';

const Wishlist = ({ setOpenWishlist }) => {
    const { cart } = useSelector((state) => state.cart);
    const { wishlist } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    const removeFromWishlistHandler = (data) => {
        dispatch(removeFromWishlist(data));
    };

    const addToCartHandler = (data, id) => {
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
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-30'>
            <div className='fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm'>
                {wishlist && wishlist.length === 0 ? (
                    <div className='w-full h-screen flex items-center justify-center'>
                        <div className='flex w-full justify-end pt-5 pr-5 fixed top-3 right-3'>
                            <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenWishlist(false)} />
                        </div>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className='flex flex-col justify-center items-center gap-4 pb-20'>
                            <div>
                                <img className='w-80 rounded-lg p-4 mx-auto' src={emptyCart} alt='emptyCart' />
                            </div>
                            <div className='max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg'>
                                <h1 className='font-titleFont text-xl font-bold uppercase'>Your Cart feels lonely.</h1>
                                <p className='text-sm text-center px-10 -mt-2'>
                                    Your Shopping cart lives to serve. Give it purpose - fill it with books, electronics, videos, etc. and make it happy.
                                </p>
                                <Link to='/shop'>
                                    <button className='bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300'>
                                        Continue Shopping
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    <>
                        <div>
                            <div className='flex w-full justify-end pt-5 pr-5'>
                                <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenWishlist(false)} />
                            </div>
                            <div className={`${styles.noramlFlex} p-4`}>
                                <AiOutlineHeart size={25} />
                                <h5 className='pl-2 text-[20px] font-[500]'>{wishlist && wishlist.length} items</h5>
                            </div>
                            <br />
                            <div className='w-full border-t'>
                                {wishlist &&
                                    wishlist.map((i, index) => (
                                        <CartSingle
                                            key={index}
                                            data={i}
                                            removeFromWishlistHandler={removeFromWishlistHandler}
                                            addToCartHandler={addToCartHandler}
                                        />
                                    ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
    return (
        <div className='border-b p-4'>
            <div className='w-full grid grid-cols-5 mb-4 border py-2'>
                <div className='flex col-span-5 lgl:col-span-3 items-center gap-4 ml-4'>
                    <img className='w-32 h-32' src={data?.images && data?.images[0]?.url} alt='productImage' />
                    <h1 className='font-titleFont font-semibold'>{data.name}</h1>
                </div>
                <div className='col-span-5 lgl:col-span-2 flex items-center justify-between flex-col md:flex-row sm:flex-row py-4 lgl:py-0 px-4 lgl:px-6 gap-6 lgl:gap-0'>
                    <div className='flex w-1/3 items-center text-lg font-semibold'>&#8377; {data.discountPrice}</div>
                    <div className='w-1/3 flex gap-6 justify-end font-titleFont font-bold text-lg'>
                        <BsCartPlus size={20} className='cursor-pointer' tile='Add to cart' onClick={() => addToCartHandler(data, data?._id)} />
                        <ImCross className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2" onClick={() => removeFromWishlistHandler(data)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
