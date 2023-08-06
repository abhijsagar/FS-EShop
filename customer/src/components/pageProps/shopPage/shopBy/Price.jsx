import React from "react";
import NavTitle from "./NavTitle";

const Price = ({ setFilterBy }) => {
    const priceList = [
        {
            _id: 950,
            priceOne: 0,
            priceTwo: 4999,
        },
        {
            _id: 951,
            priceOne: 5000,
            priceTwo: 9999,
        },
        {
            _id: 952,
            priceOne: 10000,
            priceTwo: 19999,
        },
        {
            _id: 953,
            priceOne: 20000,
            priceTwo: 29999,
        },
        {
            _id: 954,
            priceOne: 30000,
            priceTwo: 39999,
        },
        {
            _id: 955,
            priceOne: 40000,
            priceTwo: 49999,
        },
        {
            _id: 956,
            priceOne: 50000,
            priceTwo: 99999,
        },
    ];
    return (
        <div className='cursor-pointer'>
            <NavTitle title='Shop by Price' icons={false} />
            <div className='font-titleFont'>
                <ul className='flex flex-col gap-4 text-sm lg:text-base text-[#767676]'>
                    {priceList.map((item) => (
                        <li
                            key={item._id}
                            onClick={() => setFilterBy({ type: 'price', value: `${item.priceOne}-${item.priceTwo}` })}
                            className='border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300'>
                            &#8377;{item.priceOne.toFixed(0)} - &#8377;{item.priceTwo.toFixed(0)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Price;
