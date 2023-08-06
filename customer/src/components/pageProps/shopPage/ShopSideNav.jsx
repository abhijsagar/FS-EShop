import React from 'react';
import Brand from './shopBy/Brand';
import Category from './shopBy/Category';
import Color from './shopBy/Color';
import Price from './shopBy/Price';

const ShopSideNav = ({ setFilterBy }) => {
    return (
        <div className='w-full flex flex-col gap-6'>
            <Category icons={false} setFilterBy={setFilterBy} />
            <Price setFilterBy={setFilterBy} />
            {/* <Brand />
            <Color /> */}
        </div>
    );
};

export default ShopSideNav;
