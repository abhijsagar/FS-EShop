import React, { useEffect, useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { logoLight } from '../../assets/images';
import { useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from '../../styles/styles';
import { RxAvatar } from 'react-icons/rx';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [errname, setErrname] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
        setErrname('');
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setErrEmail('');
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrPassword('');
    };
    const EmailValidation = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    };

    const handleFileInputChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            setErrname('Enter your name');
        }
        if (!email) {
            setErrEmail('Enter your email');
        } else {
            if (!EmailValidation(email)) {
                setErrEmail('Enter a Valid email');
            }
        }
        if (!password) {
            setErrPassword('Create a password');
        } else {
            if (password.length < 6) {
                setErrPassword('Passwords must be at least 6 characters');
            }
        }
        if (name && email && password && password.length >= 6) {
            axios
                .post(`${server}/user/create-user`, { name, email, password, avatar })
                .then((res) => {
                    toast.success(res.data.message);
                    setName('');
                    setEmail('');
                    setPassword('');
                    setAvatar();
                    navigate('/signin');
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        }
    };

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/');
        }
    }, []);

    return (
        <div className='w-full h-screen flex items-center justify-start'>
            <div className='w-full lgl:w-[500px] h-full flex flex-col justify-center'>
                {successMsg ? (
                    <div className='w-[500px]'>
                        <p className='w-full px-4 py-10 text-green-500 font-medium font-titleFont'>{successMsg}</p>
                        <Link to='/signin'>
                            <button className='w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300'>
                                Sign in
                            </button>
                        </Link>
                    </div>
                ) : (
                    <form className='w-full lgl:w-[500px] h-screen flex items-center justify-center' onSubmit={handleSubmit}>
                        <div className='px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor'>
                            <h1 className='font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4'>
                                Create your account
                            </h1>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-col gap-.5'>
                                    <p className='font-titleFont text-base font-semibold text-gray-600'>Full Name</p>
                                    <input
                                        onChange={handleName}
                                        value={name}
                                        className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                                        type='text'
                                        placeholder='eg. John Doe'
                                    />
                                    {errname && (
                                        <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                                            <span className='font-bold italic mr-1'>!</span>
                                            {errname}
                                        </p>
                                    )}
                                </div>
                                <div className='flex flex-col gap-.5'>
                                    <p className='font-titleFont text-base font-semibold text-gray-600'>Work Email</p>
                                    <input
                                        onChange={handleEmail}
                                        value={email}
                                        className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
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
                                    <input
                                        onChange={handlePassword}
                                        value={password}
                                        className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                                        type={visible ? 'text' : 'password'}
                                        placeholder='Create password'
                                    />
                                    {visible ? (
                                        <AiOutlineEye className='absolute right-2 top-2 cursor-pointer' size={25} onClick={() => setVisible(false)} />
                                    ) : (
                                        <AiOutlineEyeInvisible className='absolute right-2 top-2 cursor-pointer' size={25} onClick={() => setVisible(true)} />
                                    )}
                                    {errPassword && (
                                        <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                                            <span className='font-bold italic mr-1'>!</span>
                                            {errPassword}
                                        </p>
                                    )}
                                </div>
                                <div className='flex items-start mdl:items-center gap-2'>
                                    <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                                        {avatar ? (
                                            <img src={avatar} alt='avatar' className='h-full w-full object-cover rounded-full' />
                                        ) : (
                                            <RxAvatar className='h-8 w-8' />
                                        )}
                                    </span>
                                    <label
                                        htmlFor='file-input'
                                        className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                                        <span>Upload a file</span>
                                        <input
                                            type='file'
                                            name='avatar'
                                            id='file-input'
                                            accept='.jpg,.jpeg,.png'
                                            onChange={handleFileInputChange}
                                            className='sr-only'
                                        />
                                    </label>
                                </div>
                                <button
                                    type='submit'
                                    className={
                                        'bg-primeColor hover:bg-black hover:text-white cursor-pointer w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300'
                                    }>
                                    Create Account
                                </button>
                                <p className='text-sm text-center font-titleFont font-medium'>
                                    Already have an account?{' '}
                                    <Link to='/signin'>
                                        <span className='hover:text-blue-600 duration-300'>Sign in</span>
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

export default SignUp;
