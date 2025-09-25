import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/auth/useAuth";

const ProtectedRoute = ({ allowRoles = [], fallbackPath = "/login" }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const accessToken = useSelector((state) => state.auth.accessToken);
  console.log("ProtectedRoute Debug:", {
    isAuthenticated,
    accessToken: !!accessToken,
    userRole: user?.role,
    requiredRoles: allowRoles,
  });

  if (!isAuthenticated || !accessToken) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  if (allowRoles.length > 0) {
    const hasRequiredRole = user?.role && allowRoles.includes(user.role);

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
