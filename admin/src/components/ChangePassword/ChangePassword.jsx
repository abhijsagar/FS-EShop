import React, { useState } from 'react';
import { server } from '../../server';
import styles from '../../styles/styles';
import { toast } from 'react-toastify';
import axios from 'axios';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const passwordChangeHandler = async (e) => {
        e.preventDefault();

        await axios
            .put(`${server}/user/update-user-password`, { oldPassword, newPassword, confirmPassword }, { withCredentials: true })
            .then((res) => {
                toast.success(res.data.success);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    return (
        <div className='w-full flex justify-center pt-5'>
            <div className='w-[97%]'>
                <h3 className='text-[22px] font-Poppins pb-2'>Change Password</h3>
                <div className='w-full bg-white rounded pt-2 pb-6'>
                    <div className='w-full'>
                        <form ariaRequired onSubmit={passwordChangeHandler} className='flex flex-col px-5'>
                            <div className=' w-[100%] 800px:w-[50%] mt-5'>
                                <label className='block pb-2'>Enter your old password</label>
                                <input
                                    type='password'
                                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className=' w-[100%] 800px:w-[50%] mt-2'>
                                <label className='block pb-2'>Enter your new password</label>
                                <input
                                    type='password'
                                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className=' w-[100%] 800px:w-[50%] mt-2'>
                                <label className='block pb-2'>Enter your confirm password</label>
                                <input
                                    type='password'
                                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <input
                                    className={
                                        'flex mt-8 justify-center items-center bg-black text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold'
                                    }
                                    required
                                    value='Update'
                                    type='submit'
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
