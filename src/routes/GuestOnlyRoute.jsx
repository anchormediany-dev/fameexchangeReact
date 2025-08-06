import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const GuestOnlyRoute = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  return accessToken ? <Navigate to="/talent-profile" replace /> : <Outlet />;
};

export default GuestOnlyRoute;
