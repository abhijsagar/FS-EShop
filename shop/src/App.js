import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    ShopCreatePage,
    SellerActivationPage,
    ShopLoginPage,
    ShopDashboardPage,
    ShopCreateProduct,
    ShopAllProducts,
    ShopCreateEvents,
    ShopAllEvents,
    ShopAllCoupons,
    ShopPreviewPage,
    ShopAllOrders,
    ShopOrderDetails,
    ShopAllRefunds,
    ShopSettingsPage,
    ShopWithDrawMoneyPage,
    ShopInboxPage,
    ShopHomePage,
    ProductDetailsPage,
} from './routes/ShopRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store';
import { loadSeller, loadUser } from './redux/actions/user';
import SellerProtectedRoute from './routes/SellerProtectedRoute';
import { getAllProducts } from './redux/actions/product';
import { getAllEvents } from './redux/actions/event';

const App = () => {
    useEffect(() => {
        Store.dispatch(loadUser());
        Store.dispatch(loadSeller());
        Store.dispatch(getAllProducts());
        Store.dispatch(getAllEvents());
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ShopLoginPage />} />
                <Route path='/shop-create' element={<ShopCreatePage />} />
                <Route path='/product/:id' element={<ProductDetailsPage />} />
                <Route path='/shop/preview/:id' element={<ShopPreviewPage />} />
                <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
                <Route
                    path='/shop/:id'
                    element={
                        <SellerProtectedRoute>
                            <ShopHomePage />
                        </SellerProtectedRoute>
                    }
                />
                <Route
                    path='/settings'
                    element={
                        <SellerProtectedRoute>
                            <ShopSettingsPage />
                        </SellerProtectedRoute>
                    }
                />
                <Route
                    path='/dashboard'
                    element={
                        <SellerProtectedRoute>
                            <ShopDashboardPage />
                        </SellerProtectedRoute>
                    }
                />
                <Route
                    path='/dashboard-create-product'
                    element={
                        <SellerProtectedRoute>
                            <ShopCreateProduct />
                        </SellerProtectedRoute>
                    }
                />
                <Route
                    path='/dashboard-orders'
                    element={
                        <SellerProtectedRoute>
                            <ShopAllOrders />
                        </SellerProtectedRoute>
                    }
                />
                <Route
                    path='/dashboard-refunds'
                    element={
                        <SellerProtectedRoute>
                            <ShopAllRefunds />
                        </SellerProtectedRoute>
                    }
                />

                <Route
                    path='/order/:id'
                    element={
                        <SellerProtectedRoute>
                            <ShopOrderDetails />
                        </SellerProtectedRoute>
                    }
                />
                <Route
                    path='/dashboard-products'
                    element={
                        <SellerProtectedRoute>
                            <ShopAllProducts />
                        </SellerProtectedRoute>
                    }
                />
                <Route
                    path='/dashboard-create-event'
                    element={
                        <SellerProtectedRoute>
                            <ShopCreateEvents />
                        </SellerProtectedRoute>
                    }
                />
                <Route
                    path='/dashboard-events'
                    element={
                        <SellerProtectedRoute>
                            <ShopAllEvents />
                        </SellerProtectedRoute>
                    }
                />
                <Route
                    path='/dashboard-coupons'
                    element={
                        <SellerProtectedRoute>
                            <ShopAllCoupons />
                        </SellerProtectedRoute>
                    }
                />
                <Route
                    path='/dashboard-withdraw-money'
                    element={
                        <SellerProtectedRoute>
                            <ShopWithDrawMoneyPage />
                        </SellerProtectedRoute>
                    }
                />
                <Route
                    path='/dashboard-messages'
                    element={
                        <SellerProtectedRoute>
                            <ShopInboxPage />
                        </SellerProtectedRoute>
                    }
                />
            </Routes>
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
    );
};

export default App;
