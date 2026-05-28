import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/login/Login";
import MotionPageWrapper from "./components/MotionPageWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FAQ from "./pages/FAQ";
import ProtectedRoute from "./routes/ProtectedRoute";
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
// import MeetGreetPage from "./pages/meet_greet/MeetGreetPage";
import InversePage from "./pages/inverse/InversePage";
import InverseCheckoutPage from "./pages/inverse/InverseCheckoutPage";
import EventsPage from "./pages/events/EventsPage";
import FutureMusicians from "./pages/future_musicians/FutureMusicians";
import TradingAccountPage from "./pages/trading_account/TradingAccountPage";
import TradeTalentPage from "./pages/trade_talent/TradeTalentPage";
import TradingDashboard from "./pages/trade_talent/TradingDashboard";
import AuthGate from "./components/AuthGate";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TalentDashboard from "./pages/talent_dashboard/TalentDashboard";
import TalentListing from "./pages/talent/TalentListing";
import SignupOtpVerification from "./components/SignupOtpVerification";
import VerifyId from "./components/VerifyId";
import NetworthCalculator from "./components/NetworthCalculator";
import GuestOnlyRoute from "./routes/GuestOnlyRoute";
import EventCreateForm from "./pages/create_events/EventCreateForm";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminContact from "./pages/admin/AdminContact";
import OurTeam from "./pages/team/OurTeam";
import CustomerReview from "./pages/customer_review/CustomerReview";
import EventDetails from "./pages/events/EventDetails";
import SignupTalent from "./pages/signup/SignupTalent";
import SignupFan from "./pages/signup/SignupFan";
import SignupModal from "./components/SignupModal";
import ForgotPassword from "./components/ForgotPassword";
import Verification from "./components/Verification";
import ResetPassword from "./components/ResetPassword";
import TalentProfileForFan from "./pages/talent_profile_fan/TalentProfileForFan";
import TalentCompactList from "./pages/TalentsListForFan";
import AdminFaq from "./pages/admin/AdminFaq";
import AdminInverseFeatured from "./pages/admin/AdminInverseFeatured";
import AdminPageVisibility from "./pages/admin/AdminPageVisibility";
import AdminEventsListings from "./pages/admin/AdminEventsListings";
import AdminInverse from "./pages/admin/AdminInverse";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReviews from "./pages/admin/reviews/AdminReviews";
import AddAdminReviews from "./pages/admin/reviews/AddAdminReviews";
import AdminTeams from "./pages/admin/teams/AdminTeams";
import AddAdminTeam from "./pages/admin/teams/AddAdminTeam";
import UpdateProfile from "./pages/UpdateProfile";
import FanProfile from "./pages/fan/FanProfile";
import ContactPage from "./pages/contact/ContactPage";
import BrandedTalentSharesPage from "./pages/branded_talent_shares/BrandedTalentSharesPage";
import Unauthorized from "./pages/Unauthorized";
import AdminKycListings from "./pages/admin/AdminKycListings";
import KYCDetailsPage from "./pages/KYCDetailsPage";
import FanProfileForAdmin from "./pages/admin/FanProfileForAdmin";
import TalentProfileForAdmin from "./pages/admin/TalentProfileForAdmin";
import CheckoutPage from "./pages/checkout_pages/Checkout";
import AttendeesStep from "./pages/checkout_pages/steps/AttendeesStep";
import BillingStep from "./pages/checkout_pages/steps/BillingStep";
import PaymentStep from "./pages/checkout_pages/steps/PaymentStep";
import ConfirmationStep from "./pages/checkout_pages/steps/ConfirmationStep";
import CheckoutLayout from "./pages/checkout_pages/CheckoutLayout";
import AdminProductsListings from "./pages/admin/AdminProductsListings";
import AddProduct from "./pages/admin/AddProduct";
import AllProducts from "./pages/AllProducts";
import ProductCheckoutPage from "./pages/product_checkout/ProductCheckoutPage";
import SessionExpiredModal from "./components/SessionExpiredModal";

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
              className="text-white  transition-colors duration-200 font-medium"
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
          <Route
            path="talent-profile-fan"
            element={
              <MotionPageWrapper>
                <TalentProfileForFan />
              </MotionPageWrapper>
            }
          />
          <Route
            path="all-talents"
            element={
              <MotionPageWrapper>
                <TalentCompactList />
              </MotionPageWrapper>
            }
          />
          <Route path="/checkout/:id" element={<CheckoutLayout />}>
            <Route index element={<Navigate to="attendees" replace />} />
            <Route path="attendees" element={<AttendeesStep />} />
            <Route path="billing" element={<BillingStep />} />
            <Route path="payment" element={<PaymentStep />} />
            <Route path="confirmation" element={<ConfirmationStep />} />
          </Route>
          <Route
            path="talent-profile/:id"
            element={
              <MotionPageWrapper>
                <TalentProfileForFan />
              </MotionPageWrapper>
            }
          />
          <Route
            path="forgot-password"
            element={
              <MotionPageWrapper>
                <ForgotPassword />
              </MotionPageWrapper>
            }
          />
          <Route
            path="verify-reset-otp"
            element={
              <MotionPageWrapper>
                <Verification />
              </MotionPageWrapper>
            }
          />
          <Route
            path="reset-password"
            element={
              <MotionPageWrapper>
                <ResetPassword />
              </MotionPageWrapper>
            }
          />
          {/* Teams */}
          <Route
            path="our-team"
            element={
              <MotionPageWrapper>
                <OurTeam />
              </MotionPageWrapper>
            }
          />
          {/* Customer review*/}
          <Route
            path="reviews"
            element={
              <MotionPageWrapper>
                <CustomerReview />
              </MotionPageWrapper>
            }
          />
          <Route
            path="checkout/:id"
            element={
              <MotionPageWrapper>
                <CheckoutPage />
              </MotionPageWrapper>
            }
          />
          {/* Talent Profile Page */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="talent/:id"
              element={
                <MotionPageWrapper>
                  <TalentProfile />
                </MotionPageWrapper>
              }
            />
          </Route>
          <Route
            path="fan/user-details/:id"
            element={
              <MotionPageWrapper>
                <FanProfileForAdmin />
              </MotionPageWrapper>
            }
          />
          <Route
            path="talent/user-details/:id"
            element={
              <MotionPageWrapper>
                <TalentProfileForAdmin />
              </MotionPageWrapper>
            }
          />
          {/* Fan Profile Page */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="fan/:id"
              element={
                <MotionPageWrapper>
                  <FanProfile />
                </MotionPageWrapper>
              }
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path="update-profile/:id"
              element={
                <MotionPageWrapper>
                  <UpdateProfile />
                </MotionPageWrapper>
              }
            />
          </Route>
          <Route
            path="kyc/:id"
            element={
              <MotionPageWrapper>
                <KYCDetailsPage />
              </MotionPageWrapper>
            }
          />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route element={<ProtectedRoute allowRoles={["ADMIN"]} />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route
                index
                element={
                  <MotionPageWrapper>
                    <AdminHome />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="newsletter"
                element={
                  <MotionPageWrapper>
                    <AdminNewsletter />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="kyc-requests"
                element={
                  <MotionPageWrapper>
                    <AdminKycListings />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="contact"
                element={
                  <MotionPageWrapper>
                    <AdminContact />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="reviews"
                element={
                  <MotionPageWrapper>
                    <AdminReviews />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="faq"
                element={
                  <MotionPageWrapper>
                    <AdminFaq />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="products"
                element={
                  <MotionPageWrapper>
                    <AdminProductsListings />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="add-product"
                element={
                  <MotionPageWrapper>
                    <AddProduct />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="edit-product/:id"
                element={
                  <MotionPageWrapper>
                    <AddProduct />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="inverse"
                element={
                  <MotionPageWrapper>
                    <AdminInverse />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="users"
                element={
                  <MotionPageWrapper>
                    <AdminUsers />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="add-event"
                element={
                  <MotionPageWrapper>
                    <EventCreateForm />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="add-review"
                element={
                  <MotionPageWrapper>
                    <AddAdminReviews />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="teams"
                element={
                  <MotionPageWrapper>
                    <AdminTeams />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="add-team"
                element={
                  <MotionPageWrapper>
                    <AddAdminTeam />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="events"
                element={
                  <MotionPageWrapper>
                    <AdminEventsListings />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="inverse-featured"
                element={
                  <MotionPageWrapper>
                    <AdminInverseFeatured />
                  </MotionPageWrapper>
                }
              />
              <Route
                path="page-visibility"
                element={
                  <MotionPageWrapper>
                    <AdminPageVisibility />
                  </MotionPageWrapper>
                }
              />
            </Route>
          </Route>
          {/* Create event */}
          <Route element={<ProtectedRoute />}>
            {/* <Route
              path="add-event"
              element={
                <MotionPageWrapper>
                  <EventCreateForm />
                </MotionPageWrapper>
              }
            /> */}
          </Route>

          <Route
            path="event-details/:id"
            element={
              <MotionPageWrapper>
                <EventDetails />
              </MotionPageWrapper>
            }
          />

          {/* future_musicians Page */}
          <Route
            path="future"
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
          {/* trade-talent Pages */}
          <Route
            path="trade-talent"
            element={
              <MotionPageWrapper>
                <AuthGate
                  title="Sign in to trade"
                  message="Talent trading requires an active Fame Exchange account. Sign in or create one to access the trading desk."
                >
                  <TradeTalentPage />
                </AuthGate>
              </MotionPageWrapper>
            }
          />
          <Route
            path="trade-talent/:id"
            element={
              <MotionPageWrapper>
                <AuthGate
                  title="Sign in to trade"
                  message="Talent trading requires an active Fame Exchange account. Sign in or create one to access the trading desk."
                >
                  <TradeTalentPage />
                </AuthGate>
              </MotionPageWrapper>
            }
          />
          {/* Trading Dashboard */}
          <Route
            path="trading-dashboard"
            element={
              <MotionPageWrapper>
                <TradingDashboard />
              </MotionPageWrapper>
            }
          />
          {/* Signup page Page */}
          <Route element={<GuestOnlyRoute />}>
            {/* Role selector */}
            {/* <Route
              path="signup"
              element={
                <MotionPageWrapper>
                  <SignupModal />
                </MotionPageWrapper>
              }
            /> */}

            {/* Talent signup */}
            <Route
              path="signup/talent"
              element={
                <MotionPageWrapper>
                  <SignupTalent role="TALENT" />
                </MotionPageWrapper>
              }
            />

            {/* Fan signup */}
            <Route
              path="signup/fan"
              element={
                <MotionPageWrapper>
                  <SignupFan role="FAN" />
                </MotionPageWrapper>
              }
            />
          </Route>
          <Route
            path="verify-otp"
            element={
              <MotionPageWrapper>
                <SignupOtpVerification />
              </MotionPageWrapper>
            }
          />
          <Route
            path="verify-id"
            element={
              <MotionPageWrapper>
                <VerifyId />
              </MotionPageWrapper>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="networth-calculator"
              element={
                <MotionPageWrapper>
                  <NetworthCalculator />
                </MotionPageWrapper>
              }
            />
          </Route>
          {/* Login page Page */}
          <Route element={<GuestOnlyRoute />}>
            <Route
              path="login"
              element={
                <MotionPageWrapper>
                  <Login />
                </MotionPageWrapper>
              }
            />
          </Route>
          {/* Inverse Page */}
          <Route
            path="inverse/:id"
            element={
              <MotionPageWrapper>
                <InversePage />
              </MotionPageWrapper>
            }
          />
          <Route
            path="inverse"
            element={
              <MotionPageWrapper>
                <InversePage />
              </MotionPageWrapper>
            }
          />
          <Route
            path="inverse-checkout/:sessionId"
            element={
              <MotionPageWrapper>
                <InverseCheckoutPage />
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
          <Route
            path="contact-us"
            element={
              <MotionPageWrapper>
                <ContactPage />
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
                <BrandedTalentSharesPage />
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
        {/* <Route
          path="help-support"
          element={
            <MotionPageWrapper>
              <HelpSupport />
            </MotionPageWrapper>
          }
        /> */}
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
          path="products"
          element={
            <MotionPageWrapper>
              <AllProducts />
            </MotionPageWrapper>
          }
        />
        <Route
          path="product-checkout"
          element={
            <MotionPageWrapper>
              <ProductCheckoutPage />
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
      <SessionExpiredModal />
    </AnimatePresence>
  );
}
