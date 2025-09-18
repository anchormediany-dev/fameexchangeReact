import { useSelector } from "react-redux";
export function useAuth() {
  const { accessToken, user } = useSelector((state) => state.auth);
  const storedToken = localStorage.getItem("accessToken");
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const token = accessToken || storedToken;
  const currentUser = user || storedUser;
  return {
    isAuthenticated: Boolean(token && currentUser),
    token,
    user: currentUser,
  };
}
