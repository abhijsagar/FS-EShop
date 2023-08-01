import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart, FaHeart } from 'react-icons/fa';
import Flex from '../../designLayouts/Flex';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { categoriesData } from '../../../static';
import Wishlist from '../../Wishlist/Wishlist';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../../server';

const SearchedProduct = ({ item, setSearchQuery }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() =>
                navigate(`/shop/${item.productName.toLowerCase().split(' ').join('')}`, {
                    state: {
                        item: item,
                    },
                }) & setSearchQuery('')
            }
            key={item._id}
            className='max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3'>
            <img className='w-24' src={item.images[0]?.url} alt='productImg' />
            <div className='flex flex-col gap-1'>
                <p className='font-semibold text-lg'>{item.name}</p>
                <p className='text-xs'>{item.description}</p>
                <p className='text-sm'>
                    Price: <span className='text-primeColor font-semibold'>&#8377; {item.discountPrice}</span>
                </p>
            </div>
        </div>
    );
};

const HeaderBottom = () => {
    const ref = useRef();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);
    const { allProducts } = useSelector((state) => state.products);
    const [show, setShow] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [openWishlist, setOpenWishlist] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const logoutHandler = () => {
        axios
            .get(`${server}/user/logout`, { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message);
                window.location.reload(true);
                navigate('/signin');
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    useEffect(() => {
        const filtered = allProducts && allProducts.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredProducts(filtered);
    }, [searchQuery]);

    return (
        <>
            <div className='w-full bg-[#F5F5F3] relative'>
                <div className='max-w-container mx-6'>
                    <Flex className='flex flex-col md:flex-row items-center md:gap-4 lg:items-center justify-between w-full px-4 py-4 h-full lg:h-24'>
                        <div onClick={() => setShow(!show)} ref={ref} className='flex h-14 cursor-pointer items-center gap-2 text-primeColor'>
                            <HiOutlineMenuAlt4 className='w-5 h-5' />
                            <p className='text-[14px] font-normal'>Shop by Category</p>
                            {show && (
                                <motion.ul
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className='absolute top-12 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6'>
                                    {categoriesData &&
                                        categoriesData.map((i) => {
                                            const handleSubmit = (i) => {
                                                navigate(`/shop?category=${i.title}`);
                                            };
                                            return (
                                                <li
                                                    key={i.id}
                                                    onClick={() => handleSubmit(i)}
                                                    className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                                                    {i.title}
                                                </li>
                                            );
                                        })}
                                </motion.ul>
                            )}
                        </div>
                        <div className='relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl'>
                            <input
                                className='flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]'
                                type='text'
                                onChange={handleSearch}
                                value={searchQuery}
                                placeholder='Search your products here'
                            />
                            <FaSearch className='w-5 h-5' />
                            {searchQuery && (
                                <div
                                    className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}>
                                    {searchQuery && filteredProducts.map((item) => <SearchedProduct item={item} setSearchQuery={setSearchQuery} />)}
                                </div>
                            )}
                        </div>
                        <div className='flex gap-4 mt-4 mb-2 lg:mt-0 items-center pr-6 cursor-pointer relative'>
                            <div onClick={() => setShowUser(!showUser)} className='flex'>
                                <FaUser />
                                <FaCaretDown />
                            </div>
                            {showUser && (
                                <motion.ul
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className='absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6'>
                                    {!isAuthenticated ? (
                                        <>
                                            <Link onClick={() => setShowUser(false)} to='/signin'>
                                                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                                                    Sign In
                                                </li>
                                            </Link>
                                            <Link onClick={() => setShowUser(false)} to='/signup'>
                                                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                                                    Sign Up
                                                </li>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link onClick={() => setShowUser(false)} to='/profile'>
                                                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                                                    Profile
                                                </li>
                                            </Link>
                                            <Link onClick={() => setShowUser(false)} to='/inbox'>
                                                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                                                    Inbox
                                                </li>
                                            </Link>

                                            <li
                                                onClick={logoutHandler}
                                                className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                                                Sign Out
                                            </li>
                                        </>
                                    )}
                                </motion.ul>
                            )}
                            <div className='relative' onClick={() => setOpenWishlist(true)}>
                                <FaHeart />
                                <span className='absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white'>
                                    {wishlist && wishlist.length}
                                </span>
                            </div>
                            <div className='relative' onClick={() => navigate('/cart')}>
                                <FaShoppingCart />
                                <span className='absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white'>
                                    {cart && cart.length}
                                </span>
                            </div>
                        </div>
                    </Flex>
                </div>
            </div>
            {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </>
    );
};

export default HeaderBottom;
