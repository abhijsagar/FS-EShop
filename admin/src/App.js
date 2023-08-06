import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    HomePage,
    LoginPage,
    SignupPage,
    ActivationPage,
    ChangePasswordPage,
    AdminDashboardPage,
    AdminDashboardUsers,
    AdminDashboardSellers,
    AdminDashboardOrders,
    AdminDashboardProducts,
    AdminDashboardEvents,
    AdminDashboardWithdraw,
    AdminDashboardProfile,
    AdminDashboardCategory,
} from './routes/AdminRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store';
import { loadSeller, loadUser } from './redux/actions/user';
import ProtectedAdminRoute from './routes/ProtectedAdminRoute';
import { getAllProducts } from './redux/actions/product';
import { getAllEvents } from './redux/actions/event';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ShopPreviewPage from './pages/ShopPreviewPage';

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
                <Route path='/' element={<HomePage />} />
                <Route path='/admin-login' element={<LoginPage />} />
                <Route path='/admin-signup' element={<SignupPage />} />
                <Route path='/product/:id' element={<ProductDetailsPage />} />
                <Route path='/shop/preview/:id' element={<ShopPreviewPage />} />
                <Route path='/admin-change-password' element={<ChangePasswordPage />} />
                <Route path='/activation/:activation_token' element={<ActivationPage />} />
                <Route
                    path='/admin-dashboard'
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboardPage />
                        </ProtectedAdminRoute>
                    }
                />
                <Route
                    path='/admin-users'
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboardUsers />
                        </ProtectedAdminRoute>
                    }
                />
                <Route
                    path='/admin-sellers'
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboardSellers />
                        </ProtectedAdminRoute>
                    }
                />
                <Route
                    path='/admin-orders'
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboardOrders />
                        </ProtectedAdminRoute>
                    }
                />
                <Route
                    path='/admin-products'
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboardProducts />
                        </ProtectedAdminRoute>
                    }
                />
                <Route
                    path='/admin-events'
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboardEvents />
                        </ProtectedAdminRoute>
                    }
                />
                <Route
                    path='/admin-withdraw'
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboardWithdraw />
                        </ProtectedAdminRoute>
                    }
                />
                <Route
                    path='/admin-category'
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboardCategory />
                        </ProtectedAdminRoute>
                    }
                />
                <Route
                    path='/admin-profile'
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboardProfile />
                        </ProtectedAdminRoute>
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
