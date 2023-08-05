import React from 'react';
import { brandingData } from '../../static/index';

const BannerBottom = () => {
    return (
        <div className='w-full bg-white border-b-[1px] py-4 border-b-gray-200 px-4 flex justify-center'>
            <div className='max-w-container grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mx-6 justify-between items-center'>
                {brandingData &&
                    brandingData.map((i, index) => (
                        <div className='flex justify-center gap-2 my-2 mx-3 w-auto shadow-sm hover:shadow-md duration-300' key={index}>
                            <span className='text-xl text-center w-6 ml-1'>{i.icon}</span>
                            <p className='text-lightText text-base'>{i.title}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BannerBottom;
