import React from 'react';
import { ImCross } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { removeFromCart, drecreaseQuantity, increaseQuantity } from '../../redux/slices/cartSlice';

const ItemCard = ({ item }) => {
    const dispatch = useDispatch();
    return (
        <div className='w-full grid grid-cols-5 mb-4 border py-2'>
            <div className='flex col-span-5 lgl:col-span-2 items-center gap-4 ml-4'>
                <ImCross onClick={() => dispatch(removeFromCart(item._id))} className='text-primeColor hover:text-red-500 duration-300 cursor-pointer' />
                <img className='w-32 h-32' src={item?.images && item?.images[0]?.url} alt='productImage' />
                <h1 className='font-titleFont font-semibold'>{item.name}</h1>
            </div>
            <div className='col-span-5 lgl:col-span-3 flex items-center justify-between py-4 lgl:py-0 px-4 lgl:px-0 gap-6 lgl:gap-0'>
                <div className='flex w-1/3 items-center text-lg font-semibold'>&#8377; {item.discountPrice}</div>
                <div className='w-1/3 flex items-center gap-6 text-lg'>
                    <span
                        onClick={() => dispatch(drecreaseQuantity({ _id: item._id }))}
                        className='w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300'>
                        -
                    </span>
                    <p>{item.qty}</p>
                    <span
                        onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
                        className='w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300'>
                        +
                    </span>
                </div>
                <div className='w-1/3 flex items-center font-titleFont font-bold text-lg'>
                    <p> &#8377; {item.qty * item.discountPrice}</p>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
