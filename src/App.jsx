import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MotionPageWrapper from "./components/MotionPageWrapper";
import Signup from "./pages/signup/Signup";
import FAQ from "./pages/FAQ";
import Dashboard from "./pages/dashboard/Dashboard";
import BrandedTokens from "./pages/branded_tokens/BrandedTokens";
import TalentTokens from "./pages/talent_tokens/TalentTokens";
import HelpSupport from "./pages/help_support/HelpSupport";
import AboutUs from "./pages/about/AboutUs";
import Regions from "./pages/us_international_english/Regions";
import AntiMoneyLaundering from "./pages/anti_money_laundering/AntiMoneyLaundering";
import Faq from "./pages/faq/Faq";
import AboutCrypto from "./pages/about_crypto/AboutCrypto";
import HowToBuySell from "./pages/how_to_buy_sell/HowToBuySell";
import TermsConditions from "./pages/terms_conditions/TermsConditions";
import PrivacyPolicy from "./pages/privacy_policy/PrivacyPolicy";

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
              path="/branded-tokens"
              element={
                <MotionPageWrapper>
                  <BrandedTokens />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/talent-tokens"
              element={
                <MotionPageWrapper>
                  <TalentTokens />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/help-support"
              element={
                <MotionPageWrapper>
                  <HelpSupport />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/about-us"
              element={
                <MotionPageWrapper>
                  <AboutUs />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <MotionPageWrapper>
                  <PrivacyPolicy />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/terms-conditions"
              element={
                <MotionPageWrapper>
                  <TermsConditions />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/how-to-buy-sell"
              element={
                <MotionPageWrapper>
                  <HowToBuySell />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/about-crypto"
              element={
                <MotionPageWrapper>
                  <AboutCrypto />
                </MotionPageWrapper>
              }
            />

            <Route
              path="/faq"
              element={
                <MotionPageWrapper>
                  <Faq />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/anti-money-laundering"
              element={
                <MotionPageWrapper>
                  <AntiMoneyLaundering />
                </MotionPageWrapper>
              }
            />
            <Route
              path="/us-international-english"
              element={
                <MotionPageWrapper>
                  <Regions />
                </MotionPageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
