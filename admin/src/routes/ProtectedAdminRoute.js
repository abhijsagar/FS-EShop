import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

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
