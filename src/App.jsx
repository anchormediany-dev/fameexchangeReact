import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MotionPageWrapper from "./components/MotionPageWrapper";
import Signup from "./pages/signup/Signup";
import FAQ from "./pages/FAQ";
import Dashboard from "./pages/dashboard/Dashboard";
import TopTalentTokens from "./pages/TopTalentTokens";

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
              path="/dashboard"
              element={
                <MotionPageWrapper>
                  <Dashboard />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/faqs"
              element={
                <MotionPageWrapper>
                  <FAQ />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/top-talent-tokens"
              element={
                <MotionPageWrapper>
                  <TopTalentTokens />
                </MotionPageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
