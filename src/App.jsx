import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/login/Login";
import MotionPageWrapper from "./components/MotionPageWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FAQ from "./pages/FAQ";
// import Dashboard from "./pages/dashboard/Dashboard";
import BrandedTokens from "./pages/branded_tokens/BrandedTokens";
import TalentTokens from "./pages/talent_tokens/TalentTokens";
import HelpSupport from "./pages/help_support/HelpSupport";
import AboutUs from "./pages/about/AboutUs";
import Regions from "./pages/us_international_english/Regions";
import AntiMoneyLaundering from "./pages/anti_money_laundering/AntiMoneyLaundering";
import Faq from "./pages/faq/Faq";
import HowToBuySell from "./pages/how_to_buy_sell/HowToBuySell";
import TermsConditions from "./pages/terms_conditions/TermsConditions";
import PrivacyPolicy from "./pages/privacy_policy/PrivacyPolicy";
import TalentProfile from "./pages/talent_profile/TalentProfile";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import siteLogo from "./assets/images/site-logo.png";
import BrandedTalentShares from "./pages/branded_talent_shares/BrandedTalentShares";
// import MeetGreetPage from "./pages/meet_greet/MeetGreetPage";
import InversePage from "./pages/inverse/InversePage";
import EventsPage from "./pages/events/EventsPage";
import FutureMusicians from "./pages/future_musicians/FutureMusicians";
import TradingAccountPage from "./pages/trading_account/TradingAccountPage";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/signup/Signup";
import TalentDashboard from "./pages/talent_dashboard/TalentDashboard";
import TalentListing from "./pages/talent/TalentListing";
import SignupOtpVerification from "./components/SignupOtpVerification";

// Simple Black Header Component
const SimpleHeader = () => {
  return (
    <motion.nav
      className="fixed w-full z-50 bg-black shadow-lg border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="inline-block">
            <img
              src={siteLogo}
              alt="Logo"
              className="h-10 transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Simple Navigation */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-[#a38b41] transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/talent-profile"
              className="text-white hover:text-[#a38b41] transition-colors duration-200 font-medium"
            >
              Talent Profile
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const MainLayout = () => {
  return (
    <div className="flex bg-[#171717] flex-col min-h-screen">
      {/* Full Animated Sticky Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Simple Layout Component with Black Header Only (Other Pages)
const SimpleLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Simple Black Sticky Header */}
      <SimpleHeader />

      {/* Main Content Area with top padding for fixed header */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
    </div>
  );
};

const CleanLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

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
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <MotionPageWrapper>
                <Home />
              </MotionPageWrapper>
            }
          />

          {/* Talent Profile Page */}
          <Route
            path="talent-profile"
            element={
              <MotionPageWrapper>
                <TalentProfile />
              </MotionPageWrapper>
            }
          />
          {/* future_musicians Page */}
          <Route
            path="future-musicians"
            element={
              <MotionPageWrapper>
                <FutureMusicians />
              </MotionPageWrapper>
            }
          />
          {/* trading_account Page */}
          <Route
            path="trading-account"
            element={
              <MotionPageWrapper>
                <TradingAccountPage />
              </MotionPageWrapper>
            }
          />
          {/* Signup page Page */}
          <Route
            path="signup"
            element={
              <MotionPageWrapper>
                <Signup />
              </MotionPageWrapper>
            }
          />
          <Route
            path="verify-otp"
            element={
              <MotionPageWrapper>
                <SignupOtpVerification />
              </MotionPageWrapper>
            }
          />
          {/* Login page Page */}
          <Route
            path="login"
            element={
              <MotionPageWrapper>
                <Login />
              </MotionPageWrapper>
            }
          />
          {/* Inverse Page */}
          <Route
            path="inverse"
            element={
              <MotionPageWrapper>
                <InversePage />
              </MotionPageWrapper>
            }
          />
          <Route
            path="inverse2"
            element={
              <MotionPageWrapper>
                <TalentDashboard />
              </MotionPageWrapper>
            }
          />
          {/* Talent Listing */}
          <Route
            path="talent"
            element={
              <MotionPageWrapper>
                <TalentListing />
              </MotionPageWrapper>
            }
          />
          <Route
            path="talent/:id"
            element={
              <MotionPageWrapper>
                <TalentListing />
              </MotionPageWrapper>
            }
          />
          {/* Events Page */}
          <Route
            path="events"
            element={
              <MotionPageWrapper>
                <EventsPage />
              </MotionPageWrapper>
            }
          />
          {/* <Route
            path="meet-greet"
            element={
              <MotionPageWrapper>
                <MeetGreetPage />
              </MotionPageWrapper>
            }
          /> */}
          {/* Branded Tokens Shares Page */}
          <Route
            path="branded-tokens-shares"
            element={
              <MotionPageWrapper>
                <BrandedTalentShares />
              </MotionPageWrapper>
            }
          />
        </Route>
        {/* Dashboard Pages */}
        {/* <Route
          path="dashboard"
          element={
            <MotionPageWrapper>
              <Dashboard />
            </MotionPageWrapper>
          }
        /> */}

        {/* Token Pages */}
        <Route
          path="branded-tokens"
          element={
            <MotionPageWrapper>
              <BrandedTokens />
            </MotionPageWrapper>
          }
        />
        <Route
          path="talent-tokens"
          element={
            <MotionPageWrapper>
              <TalentTokens />
            </MotionPageWrapper>
          }
        />

        {/* Support and Help Pages */}
        <Route
          path="help-support"
          element={
            <MotionPageWrapper>
              <HelpSupport />
            </MotionPageWrapper>
          }
        />
        <Route
          path="faqs"
          element={
            <MotionPageWrapper>
              <FAQ />
            </MotionPageWrapper>
          }
        />
        <Route
          path="faq"
          element={
            <MotionPageWrapper>
              <Faq />
            </MotionPageWrapper>
          }
        />

        {/* Information Pages */}
        <Route
          path="about-us"
          element={
            <MotionPageWrapper>
              <AboutUs />
            </MotionPageWrapper>
          }
        />

        <Route
          path="how-to-buy-sell"
          element={
            <MotionPageWrapper>
              <HowToBuySell />
            </MotionPageWrapper>
          }
        />

        {/* Legal Pages */}
        <Route
          path="privacy-policy"
          element={
            <MotionPageWrapper>
              <PrivacyPolicy />
            </MotionPageWrapper>
          }
        />
        <Route
          path="terms-conditions"
          element={
            <MotionPageWrapper>
              <TermsConditions />
            </MotionPageWrapper>
          }
        />
        <Route
          path="anti-money-laundering"
          element={
            <MotionPageWrapper>
              <AntiMoneyLaundering />
            </MotionPageWrapper>
          }
        />

        {/* Regional Pages */}
        <Route
          path="us-international-english"
          element={
            <MotionPageWrapper>
              <Regions />
            </MotionPageWrapper>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </AnimatePresence>
  );
}
