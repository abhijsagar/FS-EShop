import React, { useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../server';
import styles from '../styles/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { loadUser, updateUserInformation } from '../redux/actions/user';
import { Link } from 'react-router-dom';

const AdminProfileContent = () => {
    const { user } = useSelector((state) => state.user);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
    const [password, setPassword] = useState('');
    const [, setAvatar] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInformation(name, email, phoneNumber, password));
    };

    const handleImage = async (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
                axios
                    .put(
                        `${server}/user/update-avatar`,
                        { avatar: reader.result },
                        {
                            withCredentials: true,
                        }
                    )
                    .then((response) => {
                        dispatch(loadUser());
                        toast.success('avatar updated successfully!');
                    })
                    .catch((error) => {
                        toast.error(error);
                    });
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <div className='w-full flex justify-center pt-5'>
            <div className='w-[97%]'>
                <h3 className='text-[22px] font-Poppins pb-2'>Admin Profile</h3>
                <div className='w-full bg-white rounded py-6'>
                    <div className='flex justify-center w-full'>
                        <div className='relative'>
                            <img src={`${user?.avatar?.url}`} className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]' alt='' />
                            <div className='w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]'>
                                <input type='file' id='image' className='hidden' onChange={handleImage} />
                                <label htmlFor='image'>
                                    <AiOutlineCamera />
                                </label>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className='w-full px-5'>
                        <form onSubmit={handleSubmit} ariaRequired={true}>
                            <div className='w-full 800px:flex block pb-3'>
                                <div className=' w-[100%] 800px:w-[50%]'>
                                    <label className='block pb-2'>Full Name</label>
                                    <input
                                        type='text'
                                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className=' w-[100%] 800px:w-[50%]'>
                                    <label className='block pb-2'>Email Address</label>
                                    <input
                                        type='text'
                                        className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='w-full 800px:flex block pb-3'>
                                <div className=' w-[100%] 800px:w-[50%]'>
                                    <label className='block pb-2'>Phone Number</label>
                                    <input
                                        type='number'
                                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>

                                <div className=' w-[100%] 800px:w-[50%]'>
                                    <label className='block pb-2'>Enter your password</label>
                                    <input
                                        type='password'
                                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='w-full flex flex-col items-center block py-3'>
                                <input
                                    className={
                                        'my-2 flex justify-center items-center bg-black text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold'
                                    }
                                    required
                                    value='Update'
                                    type='submit'
                                />
                                <Link to='/admin-change-password'>
                                    <h3 className='pt-4 text-[#077f9c]'>Change Password</h3>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfileContent;
