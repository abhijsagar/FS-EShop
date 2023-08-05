import { useSelector } from '../../../01admin/node_modules/react-redux/es';
import { Navigate } from '../../../01admin/node_modules/react-router-dom/dist';
import Loader from '../components/Layout/Loader';

const SellerProtectedRoute = ({ children }) => {
    const { isLoading, isSeller } = useSelector((state) => state.seller);
    if (isLoading === true) {
        return <Loader />;
    } else {
        if (!isSeller) {
            return <Navigate to={`/`} replace />;
        }
        return children;
    }
};

export default SellerProtectedRoute;
