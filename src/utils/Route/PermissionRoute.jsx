import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from "prop-types";

/**
 * PermissionRoute
 * Checks if the user has the specific permission module required.
 * Allows access if:
 * 1. User is Super Admin (Role 5) - Full Access
 * 2. User is Admin (Role 4) AND has the required 'module' permission.
 */
const PermissionRoute = ({ children, module }) => {
    const user = useSelector((state) => state.loginUserReducer?.user?.user);
    const role = user?.role;
    // Permissions are attached to the role in the 'userRole' object
    const permissions = user?.userRole?.permissions || [];

    // 1. If Super Admin, allow everything
    if (role == 5) {
        return children;
    }

    // 2. If Admin (Role 4) or Staff (Role 3)
    if (role == 4 || role == 3) {
        if (!module) {
            // General access to admin dashboard if no specific module required
            return children;
        }
        // Check specific permission
        // Assuming permissions is array of objects { slug: 'users' } or strings ['users']
        // Adjust based on actual backend response. For now assuming strings or { slug: ... }
        const hasPermission = permissions.some(p => (typeof p === 'string' ? p : p.module) === module);

        if (hasPermission) {
            return children;
        }
    }

    // Default: Access Denied
    return <Navigate to="/auth/403" replace />;
};

PermissionRoute.propTypes = {
    children: PropTypes.node.isRequired,
    module: PropTypes.string,
};

export default PermissionRoute;
