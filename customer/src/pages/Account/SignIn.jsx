import React, { useEffect, useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { logoLight } from '../../assets/images';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { server } from '../../server';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { loadUser } from '../../redux/slices/userSlice';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [errEmail, setErrEmail] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const { isAuthenticated } = useSelector((state) => state.user);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setErrEmail('');
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setErrEmail('Enter your email');
        }
        if (!password) {
            setErrPassword('Create a password');
        }
        if (email && password) {
            await axios
                .post(`${server}/user/login-user`, { email, password }, { withCredentials: true })
                .then((response) => {
                    toast.success('Login Success!');
                    loadUser(response.data);
                    navigate('/');
                    setSuccessMsg(
                        `Hello dear, Thank you for your attempt. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
                    );
                    setEmail('');
                    setPassword('');
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        }
    };

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/');
        }
    }, []);
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-full lgl:w-1/2 h-full'>
                {successMsg ? (
                    <div className='w-full lgl:w-[500px] h-full flex flex-col justify-center'>
                        <p className='w-full px-4 py-10 text-green-500 font-medium font-titleFont'>{successMsg}</p>
                        <Link to='/signup'>
                            <button className='w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300'>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                ) : (
                    <form className='w-full lgl:w-[450px] h-[500px] flex items-center justify-center' onSubmit={handleSubmit}>
                        <div className='px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor'>
                            <h1 className='font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4'>Sign in</h1>
                            <div className='flex flex-col gap-3'>
                                {/* Email */}
                                <div className='flex flex-col gap-.5'>
                                    <p className='font-titleFont text-base font-semibold text-gray-600'>Work Email</p>
                                    <input
                                        onChange={(e) => handleEmail(e)}
                                        value={email}
                                        className='w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                                        type='email'
                                        placeholder='john@workemail.com'
                                    />
                                    {errEmail && (
                                        <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                                            <span className='font-bold italic mr-1'>!</span>
                                            {errEmail}
                                        </p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-.5'>
                                    <p className='font-titleFont text-base font-semibold text-gray-600'>Password</p>
                                    <div className='mt-1 relative'>
                                        <input
                                            onChange={(e) => handlePassword(e)}
                                            value={password}
                                            className='w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                                            type={visible ? 'text' : 'password'}
                                            placeholder='Create password'
                                        />
                                        {visible ? (
                                            <AiOutlineEye className='absolute right-2 top-1 cursor-pointer' size={25} onClick={() => setVisible(false)} />
                                        ) : (
                                            <AiOutlineEyeInvisible
                                                className='absolute right-2 top-1 cursor-pointer'
                                                size={25}
                                                onClick={() => setVisible(true)}
                                            />
                                        )}
                                    </div>
                                    {errPassword && (
                                        <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                                            <span className='font-bold italic mr-1'>!</span>
                                            {errPassword}
                                        </p>
                                    )}
                                </div>
                                <p className='text-sm text-right font-titleFont font-medium'>
                                    <Link to='/forgot-password'>
                                        <span className='hover:text-blue-600 duration-300'>Forgot your password?</span>
                                    </Link>
                                </p>

                                <button
                                    type='submit'
                                    className='bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300'>
                                    Sign In
                                </button>
                                <p className='text-sm text-center font-titleFont font-medium'>
                                    Don't have an Account?{' '}
                                    <Link to='/signup'>
                                        <span className='hover:text-blue-600 duration-300'>Sign up</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignIn;
