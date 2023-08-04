import { CgRedo } from 'react-icons/cg';
import { MdLocalShipping } from 'react-icons/md';

export const navBarList = [
    {
        _id: 1001,
        title: 'Home',
        link: '/',
    },
    {
        _id: 1002,
        title: 'Deals',
        link: '/deals',
    },
    {
        _id: 1003,
        title: 'Offers',
        link: '/offer',
    },
    {
        _id: 1004,
        title: 'Shop',
        link: '/shop',
    },
    {
        _id: 1005,
        title: 'About',
        link: '/about',
    },
    {
        _id: 1006,
        title: 'Contact',
        link: '/contact',
    },
    {
        _id: 1007,
        title: 'FAQ',
        link: '/faq',
    },
];

// branding data
export const brandingData = [
    {
        id: 1,
        title: 'Free Shipping',
        Description: 'From all orders over 100$',
        icon: <MdLocalShipping />,
    },
    {
        id: 2,
        title: 'Daily Surprise Offers',
        Description: 'Save up to 25% off',
        icon: <MdLocalShipping />,
    },
    {
        id: 3,
        title: 'Affortable Prices',
        Description: 'Get Factory direct price',
        icon: <CgRedo />,
    },
    {
        id: 4,
        title: 'Secure Payments',
        Description: '100% protected payments',
        icon: <CgRedo />,
    },
];

// categories data
export const categoriesData = [
    {
        id: 1,
        title: 'Computers and Laptops',
        subCategories: [
            { id: 1, title: 'Laptops' },
            { id: 2, title: 'Laptops Accessories' },
        ],
    },
    {
        id: 2,
        title: 'cosmetics and body care',
        subCategories: [],
    },
    {
        id: 3,
        title: 'Accesories',
        subCategories: [],
    },
    {
        id: 4,
        title: 'Cloths',
        subCategories: [],
    },
    {
        id: 5,
        title: 'Shoes',
        subCategories: [],
    },
    {
        id: 6,
        title: 'Gifts',
        subCategories: [],
    },
    {
        id: 7,
        title: 'Pet Care',
        subCategories: [],
    },
    {
        id: 8,
        title: 'Mobile and Tablets',
        subCategories: [],
    },
    {
        id: 9,
        title: 'Music and Gaming',
        subCategories: [],
    },
    {
        id: 10,
        title: 'Others',
        subCategories: [],
    },
];
