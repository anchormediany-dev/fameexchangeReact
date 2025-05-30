import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/login/Login";
import MotionPageWrapper from "./components/MotionPageWrapper";
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
import Home2 from "./pages/home/Home2";
import TalentProfile from "./pages/talent_profile/TalentProfile";

// Import your components - adjust paths as needed
import Navbar2 from "./components/Navbar2"; // Your animated sticky header
import Footer2 from "./components/Footer2"; // Footer component
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import siteLogo from "./assets/images/site-logo.png"; // Adjust path as needed
import SignupTwo from "./pages/signup/SignupTwo";
import BrandedTalentShares from "./pages/branded_talent_shares/BrandedTalentShares";
import MeetGreetPage from "./pages/meet_greet/MeetGreetPage";
import InversePage from "./pages/inverse/InversePage";
import EventsPage from "./pages/events/EventsPage";
import FutureMusicians from "./pages/future_musicians/FutureMusicians";

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

// Main Layout Component with Full Animated Header and Footer (Home & Talent Profile)
const MainLayout = () => {
  return (
    <div className="flex bg-[#171717] flex-col min-h-screen">
      {/* Full Animated Sticky Header */}
      <Navbar2 />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer2 />
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

// Clean Layout Component without Header and Footer (Auth Pages)
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
        {/* Routes with Full Animated Header and Footer */}
        <Route path="/" element={<MainLayout />}>
          {/* Home Page */}
          <Route
            index
            element={
              <MotionPageWrapper>
                <Home2 />
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
          {/* Signup page Page */}
          <Route
            path="signup"
            element={
              <MotionPageWrapper>
                <SignupTwo />
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
          {/* Events Page */}
          <Route
            path="events"
            element={
              <MotionPageWrapper>
                <EventsPage />
              </MotionPageWrapper>
            }
          />
          <Route
            path="meet-greet"
            element={
              <MotionPageWrapper>
                <MeetGreetPage />
              </MotionPageWrapper>
            }
          />
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
        <Route
          path="dashboard"
          element={
            <MotionPageWrapper>
              <Dashboard />
            </MotionPageWrapper>
          }
        />

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
          path="about-crypto"
          element={
            <MotionPageWrapper>
              <AboutCrypto />
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

        {/* Routes with Simple Black Header Only */}
        <Route path="/" element={<SimpleLayout />}></Route>

        {/* Routes without Any Header or Footer (Clean Auth Pages) */}
        <Route path="/" element={<CleanLayout />}>
          {/* Authentication Pages */}
          <Route
            path="login"
            element={
              <MotionPageWrapper>
                <Login />
              </MotionPageWrapper>
            }
          />
          <Route
            path="signup"
            element={
              <MotionPageWrapper>
                {/* <Signup /> */}
                <SignupTwo />
              </MotionPageWrapper>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
