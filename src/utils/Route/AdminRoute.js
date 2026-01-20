import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from "prop-types";

export default function AdminRoute({ children }) {
  const user = useSelector((state) => state.loginUserReducer?.user);
  const role = user?.user?.role;   // 4 = admin, 3 = staff

  // If NOT admin (role 4), redirect
  if (role !== 4 && role !== 5) {
    return <Navigate to="/adsmanage/all-ads" replace />;
  }

  return children;
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
