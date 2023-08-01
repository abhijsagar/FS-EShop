import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, ScrollRestoration, Outlet, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
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
import { store } from './redux/store';
import ProtectedRoute from './routes/ProtectedRoute';
import { loadUserAsync } from './redux/slices/userSlice';
import { getAllProductsAsync } from './redux/slices/productSlice';
import { getAllEventsAsync } from './redux/slices/eventSlice';
import { server } from './server';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SignIn from './pages/Account/SignIn';
import SignUp from './pages/Account/SignUp';
import HeaderBottom from './components/home/Header/HeaderBottom';
import SpecialCase from './components/SpecialCase/SpecialCase';
import FooterBottom from './components/home/Footer/FooterBottom';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Offer from './pages/Offer/Offer';
import Header from './components/home/Header/Header';
import Footer from './components/home/Footer/Footer';
import Payment from './pages/payment/Payment';
import Cart from './pages/Cart/Cart';
import Deals from './pages/Deals/Deals';

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
                <Route path='/payment-new' element={<Payment />} />
                <Route
                    path='/checkout'
                    element={
                        <ProtectedRoute>
                            <CheckoutPage />
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
    const [stripeApikey, setStripeApiKey] = useState('');

    async function getStripeApikey() {
        const { data } = await axios.get(`${server}/payment/stripeapikey`);
        setStripeApiKey(data.stripeApikey);
    }
    useEffect(() => {
        store.dispatch(loadUserAsync());
        store.dispatch(getAllProductsAsync());
        store.dispatch(getAllEventsAsync());
        getStripeApikey();
    }, []);

    return (
        <div className='font-bodyFont'>
            <BrowserRouter>
                {stripeApikey && (
                    <Elements stripe={loadStripe(stripeApikey)}>
                        <Routes>
                            <Route
                                path='/payment'
                                element={
                                    <ProtectedRoute>
                                        <PaymentPage />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </Elements>
                )}
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
            </BrowserRouter>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
