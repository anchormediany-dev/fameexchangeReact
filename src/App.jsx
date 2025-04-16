import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MotionPageWrapper from "./components/MotionPageWrapper";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Verification";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/signup/Signup";

const Page = ({ title }) => (
  <MotionPageWrapper>
    <div className="pt-28 p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold text-center">{title}</h1>
    </div>
  </MotionPageWrapper>
);

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow overflow-x-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <MotionPageWrapper>
                  <Home />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <MotionPageWrapper>
                  <Login />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/signup"
              element={
                <MotionPageWrapper>
                  <Signup />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <MotionPageWrapper>
                  <ForgotPassword />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/verification"
              element={
                <MotionPageWrapper>
                  <Verification />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/reset-password"
              element={
                <MotionPageWrapper>
                  <ResetPassword />
                </MotionPageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
