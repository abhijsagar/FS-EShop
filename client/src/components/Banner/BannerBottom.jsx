import React from 'react';
import { brandingData } from '../../static/index';

const BannerBottom = () => {
    return (
        <div className='w-full bg-white border-b-[1px] py-4 border-b-gray-200 px-4'>
            <div className='max-w-container mx-6 h-20 flex flex-col md:flex-row justify-between items-center'>
                {brandingData &&
                    brandingData.map((i, index) => (
                        <div className='flex md:w-auto items-center gap-2 w-72 shadow-sm hover:shadow-md duration-300' key={index}>
                            <span className='text-xl text-center w-6 ml-1'>{i.icon}</span>
                            <p className='text-lightText text-base'>{i.title}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BannerBottom;
