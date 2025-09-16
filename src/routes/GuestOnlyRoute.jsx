import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const getAccessToken = () => localStorage.getItem("accessToken");

export default function GuestOnlyRoute() {
  const [token, setToken] = useState(getAccessToken);
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "accessToken") setToken(getAccessToken());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // return token ? <Navigate to="/talent-profile" replace /> : <Outlet />;
  return token ? <Navigate to="/" replace /> : <Outlet />;
}
