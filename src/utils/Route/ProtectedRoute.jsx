import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
    const user = useSelector((state) => state?.loginUserReducer?.user);
    const location = useLocation();
    // Safely extract username and access_token
    const username = user?.user?.credintial?.username;
    const accessToken = user?.access_token;

    // Redirect to login if not authenticated
    if (!username || !accessToken) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
