import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import ProductDetails from '../../Products/ProductDetails';

const ProductDetailsCard = ({ setOpen, data }) => {
    return (
        <div className='bg-[#fff]'>
            {data ? (
                <div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center'>
                    <div className='w-[90%] md:h-[90vh] sm:h-[90vh] 800px:w-[60%] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4'>
                        <RxCross1 size={30} className='absolute right-3 top-3 z-50' onClick={() => setOpen(false)} />
                        <div className='block w-full 800px:flex'>
                            <ProductDetails data={data} showDesc={false} />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ProductDetailsCard;
