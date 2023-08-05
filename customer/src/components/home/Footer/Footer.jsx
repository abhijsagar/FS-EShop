import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from 'react-icons/fa';
import FooterListTitle from './FooterListTitle';
import { paymentCard } from '../../../assets/images/index';
import Image from '../../designLayouts/Image';
import { Link, useNavigate } from 'react-router-dom';
import { categoriesData } from '../../../static/index';

const Footer = () => {
    const navigate = useNavigate();
    const [emailInfo, setEmailInfo] = useState('');
    const [subscription, setSubscription] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const emailValidation = () => {
        return String(emailInfo)
            .toLocaleLowerCase()
            .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
    };

    const handleSubscription = () => {
        if (emailInfo === '') {
            setErrMsg('Please provide an Email !');
        } else if (!emailValidation(emailInfo)) {
            setErrMsg('Please give a valid Email!');
        } else {
            setSubscription(true);
            setErrMsg('');
            setEmailInfo('');
        }
    };

    return (
        <div className='w-full bg-[#F5F5F3] py-20'>
            <div className='max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-4 gap-10'>
                <div className='col-span-2'>
                    <FooterListTitle title=' More about AS Shop' />
                    <div className='flex flex-col gap-6'>
                        <p className='text-base w-full xl:w-[80%]'>
                            AS Shpo is one of the world's leading ecommerce brands and is internationally recognized for celebrating the essence of classic
                            Worldwide cool looking style.
                        </p>
                        <ul className='flex items-center gap-2'>
                            <a href='https://www.facebook.com/abhisagarj/' target='_blank' rel='noreferrer'>
                                <li className='w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300'>
                                    <FaFacebook />
                                </li>
                            </a>
                            <a href='https://github.com/abhijsagar' target='_blank' rel='noreferrer'>
                                <li className='w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300'>
                                    <FaGithub />
                                </li>
                            </a>
                            <a href='https://www.linkedin.com/in/abhijsagar/' target='_blank' rel='noreferrer'>
                                <li className='w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300'>
                                    <FaLinkedin />
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
                <div>
                    <FooterListTitle title='Shop' />
                    <ul className='flex flex-col gap-2'>
                        {categoriesData &&
                            categoriesData.map((i, index) => {
                                const handleSubmit = (i) => {
                                    navigate(`/shop?category=${i.title}`);
                                };
                                return (
                                    index < 5 && (
                                        <li
                                            key={i.id}
                                            onClick={() => handleSubmit(i)}
                                            className='font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300'>
                                            {i.title}
                                        </li>
                                    )
                                );
                            })}
                    </ul>
                </div>
                <div>
                    <FooterListTitle title='Your account' />
                    <ul className='flex flex-col gap-2'>
                        <li className='font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300'>
                            <Link to='/profile' state={{ active: 1 }}>
                                Profile
                            </Link>
                        </li>
                        <li className='font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300'>
                            <Link to='/profile' state={{ active: 1 }}>
                                Orders
                            </Link>
                        </li>
                        <li className='font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300'>
                            <Link to='/profile' state={{ active: 7 }}>
                                Addresses
                            </Link>
                        </li>
                        <li className='font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300'>
                            <Link to='/profile' state={{ active: 1 }}>
                                Account Details
                            </Link>
                        </li>
                        <li className='font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300'>
                            <a href='#paymentoptions'>Payment Options</a>
                        </li>
                    </ul>
                </div>
                <div className='col-span-2 flex flex-col items-center w-full px-4'>
                    <FooterListTitle title='Subscribe to our newsletter.' />
                    <div className='w-full'>
                        <p className='text-center mb-4'>At the element of the gate and the property.</p>
                        {subscription ? (
                            <motion.p
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className='w-full text-center text-base font-titleFont font-semibold text-green-600'>
                                Subscribed Successfully !
                            </motion.p>
                        ) : (
                            <div className='w-full flex-col xl:flex-row flex justify-between items-center gap-4'>
                                <div className='flex flex-col w-full'>
                                    <input
                                        onChange={(e) => setEmailInfo(e.target.value)}
                                        value={emailInfo}
                                        className='w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none'
                                        type='text'
                                        placeholder='Insert your email ...*'
                                    />
                                    {errMsg && <p className='text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2'>{errMsg}</p>}
                                </div>
                                <button
                                    onClick={handleSubscription}
                                    className='bg-white text-lightText w-[30%] h-10 hover:bg-black hover:text-white duration-300 text-base tracking-wide'>
                                    Subscribe
                                </button>
                            </div>
                        )}
                        <div id='paymentoptions'>
                            <Image className={`w-[80%] lg:w-[60%] mx-auto ${subscription ? 'mt-2' : 'mt-6'}`} imgSrc={paymentCard} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
