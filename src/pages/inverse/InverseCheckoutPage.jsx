import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiCreditCard,
  FiLock,
  FiCheck,
  FiUser,
} from "react-icons/fi";
import {
  useGetInverseSessionQuoteQuery,
  useCreateInverseSessionIntentMutation,
  useConfirmInverseSessionMutation,
} from "../../app/tradingApi";
import { useAuth } from "../../utils/auth/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const cardOptions = {
  style: {
    base: {
      color: "#ffffff",
      fontFamily: '"Inter", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": { color: "#6B7280" },
      backgroundColor: "transparent",
    },
    invalid: { color: "#EF4444", iconColor: "#EF4444" },
  },
  hidePostalCode: true,
};

const currency = (n) =>
  typeof n === "number"
    ? n.toLocaleString(undefined, { style: "currency", currency: "USD" })
    : "—";

function CheckoutForm({ quote, sessionId, talentId, sessionMeta }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  const [processing, setProcessing] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(null);

  const [createIntent] = useCreateInverseSessionIntentMutation();
  const [confirmInverse] = useConfirmInverseSessionMutation();

  const handlePay = async (e) => {
    e.preventDefault();
    setErrMsg("");
    if (!stripe || !elements) {
      setErrMsg("Payment system not ready, please retry");
      return;
    }
    setProcessing(true);
    try {
      // 1. Create the PaymentIntent
      const intent = await createIntent({
        sessionId,
        talentId,
      }).unwrap();

      // 2. Confirm the card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        intent.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.name || user?.firstName || undefined,
              email: user?.email || undefined,
            },
          },
        }
      );

      if (error) {
        setErrMsg(error.message || "Card was declined");
        return;
      }
      if (paymentIntent?.status !== "succeeded") {
        setErrMsg(`Payment ${paymentIntent?.status || "did not complete"}`);
        return;
      }

      // 3. Confirm with backend (creates the FanInverseRequest)
      const confirm = await confirmInverse({
        paymentIntentId: paymentIntent.id,
        sessionId,
        talentId,
        date: sessionMeta?.date,
        time: sessionMeta?.time,
        location: sessionMeta?.where || quote?.where,
        paymentMethod: "Credit Card",
      }).unwrap();

      toast.success("Booking confirmed!");
      setSuccess(confirm);
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Failed to complete payment. Please try again.";
      setErrMsg(msg);
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <FiCheck className="text-emerald-400 w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Booking confirmed
        </h3>
        <p className="text-gray-400 mb-6 text-sm">
          Your inverse session has been booked and paid. The talent will be
          notified.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/inverse"
            className="px-5 py-2.5 rounded-lg bg-[#c9a227] text-black font-semibold hover:bg-[#dbb934] transition-colors"
          >
            Back to Inverse
          </Link>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-lg border border-white/15 text-white hover:bg-white/5 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePay} className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
          Card Details
        </label>
        <div className="border border-[#2a2a2a] bg-[#0f0f0f] rounded-lg p-4">
          <CardElement options={cardOptions} />
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500">
          <FiLock className="w-3 h-3" />
          Encrypted &amp; processed by Stripe. Test card: 4242 4242 4242 4242
        </div>
      </div>

      {errMsg && (
        <div className="text-sm bg-red-900/20 border border-red-800/40 text-red-300 rounded-lg px-3 py-2">
          {errMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={processing || !stripe}
        className="w-full bg-gradient-to-r from-[#F3BA18] to-[#FF9900] hover:from-[#FF9900] hover:to-[#F3BA18] text-black font-bold py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        <FiCreditCard className="w-4 h-4" />
        {processing
          ? "Processing..."
          : `Pay ${currency(quote?.amount)} & Book`}
      </button>
    </form>
  );
}

export default function InverseCheckoutPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Talent + session metadata passed from the calendar (preferred) or from URL fallback.
  const stateData = location.state || {};
  const talentId = stateData.talentId;
  const sessionMeta = {
    date: stateData.date,
    time: stateData.time,
    where: stateData.where,
    accessTypes: stateData.accessTypes,
    talentName: stateData.talentName,
    sessionLength: stateData.sessionLength,
  };

  const {
    data: quoteRes,
    isLoading,
    isError,
    error,
  } = useGetInverseSessionQuoteQuery(sessionId, { skip: !sessionId });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: location.pathname, ...location.state },
      });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    if (!talentId) {
      // No talent id → user came here directly. Send them back.
      // This avoids confirming a payment for an unknown talent.
      // Calendar always passes talentId via location.state.
    }
  }, [talentId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-gray-400 text-sm animate-pulse">
          Loading session details…
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-8 max-w-md w-full text-center">
          <p className="text-white font-semibold mb-2">
            Couldn’t load this session
          </p>
          <p className="text-gray-500 text-sm mb-5">
            {error?.data?.message || "Please go back and try again."}
          </p>
          <button
            onClick={() => navigate("/inverse")}
            className="px-5 py-2 rounded-lg bg-[#c9a227] text-black font-semibold cursor-pointer"
          >
            Back to Inverse
          </button>
        </div>
      </div>
    );
  }

  const quote = quoteRes;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 cursor-pointer"
        >
          <FiArrowLeft />
          Back
        </button>

        <h1 className="text-3xl font-bold text-white mb-2">
          Inverse Session Checkout
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Secure your session with the talent. Payment is held by Stripe.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── Summary ── */}
          <div className="lg:col-span-3 bg-[#111111] border border-[#1f1f1f] rounded-2xl p-5 md:p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Session summary
            </h2>

            <div className="space-y-3 text-sm">
              {sessionMeta.talentName && (
                <Row
                  icon={<FiUser />}
                  label="Talent"
                  value={sessionMeta.talentName}
                />
              )}
              {sessionMeta.date && (
                <Row
                  icon={<FiCalendar />}
                  label="Date"
                  value={sessionMeta.date}
                />
              )}
              {sessionMeta.time && (
                <Row
                  icon={<FiClock />}
                  label="Time"
                  value={sessionMeta.time}
                />
              )}
              {(quote?.where || sessionMeta.where) && (
                <Row
                  icon={<FiMapPin />}
                  label="Location"
                  value={quote?.where || sessionMeta.where}
                />
              )}
              {(quote?.sessionLength || sessionMeta.sessionLength) && (
                <Row
                  icon={<FiClock />}
                  label="Length"
                  value={`${quote?.sessionLength || sessionMeta.sessionLength} min`}
                />
              )}
            </div>

            {Array.isArray(quote?.accessType) && quote.accessType.length > 0 && (
              <div className="mt-5 border-t border-[#1f1f1f] pt-4">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Access Types
                </p>
                <ul className="space-y-2">
                  {quote.accessType.map((a, i) => (
                    <li
                      key={`${a.type}-${i}`}
                      className="flex justify-between text-sm text-gray-200"
                    >
                      <span>{a.type}</span>
                      <span className="font-mono">{currency(a.price)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 border-t border-[#1f1f1f] pt-4 flex items-center justify-between">
              <span className="text-gray-400 text-sm">Total</span>
              <span className="text-2xl font-bold text-white">
                {currency(quote?.amount)}
              </span>
            </div>
          </div>

          {/* ── Payment ── */}
          <div className="lg:col-span-2 bg-[#111111] border border-[#1f1f1f] rounded-2xl p-5 md:p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FiCreditCard />
              Payment
            </h2>
            {!talentId ? (
              <div className="text-sm text-yellow-300 bg-yellow-900/20 border border-yellow-800/40 rounded-lg px-3 py-2 mb-4">
                Talent context missing. Please return to{" "}
                <Link to="/inverse" className="underline">
                  Inverse
                </Link>{" "}
                and select a session again.
              </div>
            ) : (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  quote={quote}
                  sessionId={sessionId}
                  talentId={talentId}
                  sessionMeta={sessionMeta}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
        {icon}
      </span>
      <div className="flex-1 flex items-center justify-between">
        <span className="text-gray-500">{label}</span>
        <span className="text-white font-medium">{value}</span>
      </div>
    </div>
  );
}
