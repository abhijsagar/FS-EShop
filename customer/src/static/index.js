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
        title: 'Electronics',
        subCategories: [
            { id: 1, title: 'Laptops' },
            { id: 2, title: 'Laptops Accessories' },
        ],
    },
    {
        id: 2,
        title: 'Clothes',
        subCategories: [],
    },
    {
        id: 3,
        title: 'Shoes & Apperals',
        subCategories: [],
    },
    {
        id: 4,
        title: 'Baby & Kids',
        subCategories: [],
    },
    {
        id: 5,
        title: 'Home & Furniture',
        subCategories: [],
    },
    {
        id: 6,
        title: 'Music and Gaming',
        subCategories: [],
    },
    {
        id: 7,
        title: 'Beauty & Cream',
        subCategories: [],
    },
    {
        id: 8,
        title: 'Others',
        subCategories: [],
    },
];
