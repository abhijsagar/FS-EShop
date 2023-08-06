import React, { useEffect, useState } from 'react';
import { ImPlus } from 'react-icons/im';
import NavTitle from './NavTitle';
import { categoriesData } from '../../../../static';

const Category = ({ setFilterBy }) => {
    const [category, setCategory] = useState([]);

    const setShowSubCat = (id) => {
        const index = category.findIndex((item) => item.id === id);
        category[index].showSubCat = !category[index].showSubCat;
        setCategory([...category]);
    };

    useEffect(() => {
        const updatedCtegory = categoriesData.map((cat) => {
            return { ...cat, showSubCat: false };
        });
        setCategory([...updatedCtegory]);
    }, []);
    return (
        <div className='w-full'>
            <NavTitle title='Shop by Category' icons={false} />
            <div>
                <ul className='flex flex-col gap-4 text-sm lg:text-base text-[#767676]'>
                    {category.map(({ id, title, showSubCat, subCategories }, index) => {
                        return (
                            index < 6 && (
                                <>
                                    <li
                                        key={id}
                                        onClick={() => setFilterBy({ type: 'category', value: title })}
                                        className='border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between'>
                                        <span className='w-full '>{title}</span>
                                        {subCategories.length > 0 && (
                                            <span
                                                onClick={() => setShowSubCat(id)}
                                                className='text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300'>
                                                <ImPlus />
                                            </span>
                                        )}
                                    </li>
                                    {showSubCat > 0 && (
                                        <ul className='flex flex-col ml-5 gap-4 text-sm lg:text-base text-[#767676]'>
                                            {subCategories.map(({ id, title }) => (
                                                <li key={id} className='border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between'>
                                                    <a>{title}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            )
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Category;
