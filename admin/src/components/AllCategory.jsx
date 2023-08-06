import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/styles';
import Loader from './Layout/Loader';
import { server } from '../server';
import { toast } from 'react-toastify';

const AllCategory = () => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [catName, setCatName] = useState('');
    const [subCatName, setSubCatName] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${server}/category/get-category`, {
                withCredentials: true,
            })
            .then((res) => {
                setIsLoading(false);
                setCategory(res.data.categorys);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }, [dispatch]);

    const handleDelete = async (id) => {
        axios.delete(`${server}/category/delete-category/${id}`, { withCredentials: true }).then((res) => {
            toast.success('Category deleted succesfully!');
        });
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post(
                `${server}/category/create-category`,
                {
                    catName,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success('Category created successfully!');
                setOpen(false);
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    const columns = [
        { field: 'id', headerName: 'Id', minWidth: 150, flex: 0.7 },
        {
            field: 'catName',
            headerName: 'Category Name',
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: 'subCatName',
            headerName: 'Sub Category Name',
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: 'Delete',
            flex: 0.8,
            minWidth: 120,
            headerName: '',
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => handleDelete(params.id)}>
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                );
            },
        },
    ];

    const row = [];

    category &&
        category.forEach((item) => {
            const subCat = item.catName.split('/');
            row.push({
                id: item._id,
                catName: item.catName,
                subcatName: subCat.length > 1 ? subCat[1] : '',
            });
        });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className='w-full mx-8 pt-1 mt-10 bg-white'>
                    <div className='w-full flex justify-end'>
                        <div className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`} onClick={() => setOpen(true)}>
                            <span className='text-white'>Add Category</span>
                        </div>
                    </div>
                    <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                    {open && (
                        <div className='fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center'>
                            <div className='w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4'>
                                <div className='w-full flex justify-end'>
                                    <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpen(false)} />
                                </div>
                                <h5 className='text-[30px] font-Poppins text-center'>Add Category</h5>
                                <form onSubmit={handleSubmit} aria-required={true}>
                                    <br />
                                    <div>
                                        <label className='pb-2'>
                                            Category Name <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            catName='catName'
                                            required
                                            subcatName={catName}
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                            onChange={(e) => setCatName(e.target.value)}
                                            placeholder='Enter Category Name...'
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className='pb-2'>Sub Category Name</label>
                                        <input
                                            type='text'
                                            catName='subCatName'
                                            value={subCatName}
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                            onChange={(e) => setSubCatName(e.target.value)}
                                            placeholder='Enter Sub Category Name...'
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <input
                                            type='submit'
                                            value='Create'
                                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default AllCategory;
