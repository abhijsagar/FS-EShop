import { useSelector } from '../../../01admin/node_modules/react-redux/es';
import { Navigate } from '../../../01admin/node_modules/react-router-dom/dist';

const ProtectedAdminRoute = ({ children }) => {
    const { loading, user } = useSelector((state) => state.user);
    if (loading === false) {
        if (user.role !== 'Admin') {
            return <Navigate to='/' replace />;
        }
        return children;
    }
};

export default ProtectedAdminRoute;
