import React, { useEffect, useState } from 'react';
import { Route, ScrollRestoration, Outlet, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import {
    ActivationPage,
    FAQPage,
    CheckoutPage,
    PaymentPage,
    OrderSuccessPage,
    ProductDetailsPage,
    ProfilePage,
    OrderDetailsPage,
    TrackOrderPage,
    UserInbox,
} from './routes/index.js';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './redux/store.js';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import { loadUserAsync } from './redux/slices/userSlice.js';
import { getAllProductsAsync } from './redux/slices/productSlice.js';
import { getAllEventsAsync } from './redux/slices/eventSlice.js';
import SignIn from './pages/Account/SignIn.jsx';
import SignUp from './pages/Account/SignUp.jsx';
import HeaderBottom from './components/home/Header/HeaderBottom.jsx';
import SpecialCase from './components/SpecialCase/SpecialCase.jsx';
import FooterBottom from './components/home/Footer/FooterBottom.jsx';
import Home from './pages/Home/Home.jsx';
import Shop from './pages/Shop/Shop.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Offer from './pages/Offer/Offer.jsx';
import Header from './components/home/Header/Header.jsx';
import Footer from './components/home/Footer/Footer.jsx';
import Payment from './pages/payment/Payment.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Deals from './pages/Deals/Deals.jsx';

const Layout = () => {
    return (
        <div>
            <Header />
            <HeaderBottom />
            <SpecialCase />
            <ScrollRestoration />
            <Outlet />
            <Footer />
            <FooterBottom />
        </div>
    );
};
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/activation/:activation_token' element={<ActivationPage />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/shop/:id' element={<ProductDetailsPage />} />
                <Route path='/deals' element={<Deals />} />
                <Route path='/offer' element={<Offer />} />
                <Route path='/faq' element={<FAQPage />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/cart' element={<Cart />} />
                {/* <Route path='/payment-new' element={<Payment />} /> */}
                <Route
                    path='/checkout'
                    element={
                        <ProtectedRoute>
                            <CheckoutPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/payment'
                    element={
                        <ProtectedRoute>
                            <PaymentPage />
                        </ProtectedRoute>
                    }
                />
                <Route path='/order/success' element={<OrderSuccessPage />} />
                <Route
                    path='/profile'
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/inbox'
                    element={
                        <ProtectedRoute>
                            <UserInbox />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/user/order/:id'
                    element={
                        <ProtectedRoute>
                            <OrderDetailsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/user/track/order/:id'
                    element={
                        <ProtectedRoute>
                            <TrackOrderPage />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Route>
    )
);

const App = () => {
    useEffect(() => {
        store.dispatch(loadUserAsync());
        store.dispatch(getAllProductsAsync());
        store.dispatch(getAllEventsAsync());
    }, []);

    return (
        <div className='font-bodyFont'>
            <ToastContainer
                position='bottom-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
