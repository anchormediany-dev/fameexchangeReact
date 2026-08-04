import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Outlet, Navigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Always-eager: routing infrastructure, layouts, persistent UI ─────────────
import MotionPageWrapper from "./components/MotionPageWrapper";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestOnlyRoute from "./routes/GuestOnlyRoute";
import AuthGate from "./components/AuthGate";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionExpiredModal from "./components/SessionExpiredModal";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import siteLogo from "./assets/images/site-logo.png";

// ── Lazy page components — each splits into its own JS chunk ─────────────────
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const SignupTalent = lazy(() => import("./pages/signup/SignupTalent"));
const SignupFan = lazy(() => import("./pages/signup/SignupFan"));
const SignupOtpVerification = lazy(() => import("./components/SignupOtpVerification"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const Verification = lazy(() => import("./components/Verification"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const VerifyId = lazy(() => import("./components/VerifyId"));
const ConnectSocials = lazy(() => import("./pages/ConnectSocials"));
const NetworthCalculator = lazy(() => import("./components/NetworthCalculator"));
const UpdateProfile = lazy(() => import("./pages/UpdateProfile"));
const TalentProfileForFan = lazy(() => import("./pages/talent_profile_fan/TalentProfileForFan"));
const TalentProfile = lazy(() => import("./pages/talent_profile/TalentProfile"));
const TalentQRCodePage = lazy(() => import("./pages/TalentQRCodePage"));
const TalentCompactList = lazy(() => import("./pages/TalentsListForFan"));
const TalentListing = lazy(() => import("./pages/talent/TalentListing"));
const TalentDashboard = lazy(() => import("./pages/talent_dashboard/TalentDashboard"));
const FanProfile = lazy(() => import("./pages/fan/FanProfile"));
const FanProfileForAdmin = lazy(() => import("./pages/admin/FanProfileForAdmin"));
const TalentProfileForAdmin = lazy(() => import("./pages/admin/TalentProfileForAdmin"));
const KYCDetailsPage = lazy(() => import("./pages/KYCDetailsPage"));
const TradeTalentPage = lazy(() => import("./pages/trade_talent/TradeTalentPage"));
const TradingDashboard = lazy(() => import("./pages/trade_talent/TradingDashboard"));
const InversePage = lazy(() => import("./pages/inverse/InversePage"));
const InverseCheckoutPage = lazy(() => import("./pages/inverse/InverseCheckoutPage"));
const EventsPage = lazy(() => import("./pages/events/EventsPage"));
const EventDetails = lazy(() => import("./pages/events/EventDetails"));
const EventCreateForm = lazy(() => import("./pages/create_events/EventCreateForm"));
const CheckoutLayout = lazy(() => import("./pages/checkout_pages/CheckoutLayout"));
const CheckoutPage = lazy(() => import("./pages/checkout_pages/Checkout"));
const AttendeesStep = lazy(() => import("./pages/checkout_pages/steps/AttendeesStep"));
const BillingStep = lazy(() => import("./pages/checkout_pages/steps/BillingStep"));
const PaymentStep = lazy(() => import("./pages/checkout_pages/steps/PaymentStep"));
const ConfirmationStep = lazy(() => import("./pages/checkout_pages/steps/ConfirmationStep"));
const FutureMusicians = lazy(() => import("./pages/future_musicians/FutureMusicians"));
const ContactPage = lazy(() => import("./pages/contact/ContactPage"));
const OurTeam = lazy(() => import("./pages/team/OurTeam"));
const CustomerReview = lazy(() => import("./pages/customer_review/CustomerReview"));
const BrandedTalentSharesPage = lazy(() => import("./pages/branded_talent_shares/BrandedTalentSharesPage"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const DownloadAppPage = lazy(() => import("./pages/download_app/DownloadAppPage"));
const FeaturedTalentPage = lazy(() => import("./pages/featured_talent/FeaturedTalentPage"));
const ProductCheckoutPage = lazy(() => import("./pages/product_checkout/ProductCheckoutPage"));
const BrandedTokens = lazy(() => import("./pages/branded_tokens/BrandedTokens"));
const TalentTokens = lazy(() => import("./pages/talent_tokens/TalentTokens"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Faq = lazy(() => import("./pages/faq/Faq"));
const HowToBuySell = lazy(() => import("./pages/how_to_buy_sell/HowToBuySell"));
const AboutUs = lazy(() => import("./pages/about/AboutUs"));
const PrivacyPolicy = lazy(() => import("./pages/privacy_policy/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/terms_conditions/TermsConditions"));
const AntiMoneyLaundering = lazy(() => import("./pages/anti_money_laundering/AntiMoneyLaundering"));
const Regions = lazy(() => import("./pages/us_international_english/Regions"));
const HelpSupport = lazy(() => import("./pages/help_support/HelpSupport"));
// ── Admin pages (heaviest — only loaded by ADMIN role) ───────────────────────
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome"));
const AdminNewsletter = lazy(() => import("./pages/admin/AdminNewsletter"));
const AdminContact = lazy(() => import("./pages/admin/AdminContact"));
const AdminFaq = lazy(() => import("./pages/admin/AdminFaq"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminKycListings = lazy(() => import("./pages/admin/AdminKycListings"));
const AdminEventsListings = lazy(() => import("./pages/admin/AdminEventsListings"));
const AdminInverse = lazy(() => import("./pages/admin/AdminInverse"));
const AdminInverseFeatured = lazy(() => import("./pages/admin/AdminInverseFeatured"));
const AdminFeaturedTalent = lazy(() => import("./pages/admin/AdminFeaturedTalent"));
const AdminPageVisibility = lazy(() => import("./pages/admin/AdminPageVisibility"));
const AdminFameScoreDashboard = lazy(() => import("./pages/admin/AdminFameScoreDashboard"));
const AdminReviews = lazy(() => import("./pages/admin/reviews/AdminReviews"));
const AddAdminReviews = lazy(() => import("./pages/admin/reviews/AddAdminReviews"));
const AdminTeams = lazy(() => import("./pages/admin/teams/AdminTeams"));
const AddAdminTeam = lazy(() => import("./pages/admin/teams/AddAdminTeam"));
const AdminProductsListings = lazy(() => import("./pages/admin/AdminProductsListings"));
const AddProduct = lazy(() => import("./pages/admin/AddProduct"));
const FuturesPage = lazy(() => import("./pages/futures/FuturesPage"));

// Spinner shown while any lazy page chunk loads
const PageLoader = () => (
  <div className="min-h-screen bg-[#171717] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-[#F3BA18] border-t-transparent rounded-full animate-spin" />
  </div>
);

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
  const navigate = useNavigate();

  // Android's hardware back button isn't handled by react-router on its
  // own inside a Capacitor WebView — without this, pressing it does
  // nothing (or exits the app unexpectedly) instead of navigating back.
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listenerPromise = CapacitorApp.addListener("backButton", () => {
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      } else {
        CapacitorApp.exitApp();
      }
    });

    return () => {
      listenerPromise.then((listener) => listener.remove());
    };
  }, [navigate]);

  return (
    <>
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />} key={location.pathname}>
      <Routes location={location}>
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
            <Route
              path="talent/qr-code"
              element={
                <MotionPageWrapper>
                  <TalentQRCodePage />
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
                path="featured-talent"
                element={
                  <MotionPageWrapper>
                    <AdminFeaturedTalent />
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
              <Route
                path="famescore-dashboard"
                element={
                  <MotionPageWrapper>
                    <AdminFameScoreDashboard />
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

          {/* Futures tier (Fame Futures) */}
          <Route
            path="futures"
            element={<FuturesPage />}
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
              path="connect-socials"
              element={
                <MotionPageWrapper>
                  <ConnectSocials />
                </MotionPageWrapper>
              }
            />
          </Route>
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
          path="download-app"
          element={
            <MotionPageWrapper>
              <DownloadAppPage />
            </MotionPageWrapper>
          }
        />
        <Route
          path="featured-talent"
          element={
            <MotionPageWrapper>
              <FeaturedTalentPage />
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

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </AnimatePresence>
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
    </>
  );
}
