import { useEffect, useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { FiX, FiLock } from "react-icons/fi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CARD_STYLE = {
  style: {
    base: {
      color: "#fff",
      fontFamily: "inherit",
      fontSize: "15px",
      "::placeholder": { color: "#6b7280" },
    },
    invalid: { color: "#ef4444" },
  },
};

function CardForm({ clientSecret, priceLabel, onSuccess, onCancel, busy, setBusy }) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    setCardError("");

    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (error) {
      setCardError(error.message);
      setBusy(false);
      return;
    }

    if (paymentIntent.status === "succeeded" || paymentIntent.status === "processing") {
      onSuccess();
    } else {
      setCardError(`Unexpected payment status: ${paymentIntent.status}`);
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
          Card Details
        </label>
        <div className="bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3.5">
          <CardElement options={CARD_STYLE} />
        </div>
        {cardError && <p className="text-red-400 text-xs mt-2">{cardError}</p>}
      </div>

      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
        <FiLock className="flex-shrink-0" />
        <span>Secured by Stripe. Your card is never stored on our servers.</span>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="flex-1 py-3 rounded-lg border border-[#444] text-gray-400 text-sm hover:border-gray-300 hover:text-white transition disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={busy || !stripe}
          className="flex-1 custom-button-two py-3 rounded-lg font-semibold text-sm disabled:opacity-50"
        >
          {busy ? "Processing…" : `Subscribe ${priceLabel}`}
        </button>
      </div>
    </form>
  );
}

// Generic subscription checkout modal — used for both platform Membership
// plans and a talent's custom fan tiers, which confirm identically (a
// Stripe Subscription's first invoice PaymentIntent, same
// stripe.confirmCardPayment flow as the one-time PledgeModal.jsx uses).
//
// Props:
//   title, subtitle, priceLabel — display only
//   startCheckout: async () => { clientSecret } — calls the right backend
//     endpoint (membership vs fan-subscription) and returns the client secret
//   onClose, onSuccess(name?)
export default function SubscriptionCheckoutModal({
  title,
  subtitle,
  priceLabel,
  startCheckout,
  onClose,
  onSuccess,
}) {
  const [step, setStep] = useState("loading"); // 'loading' | 'payment' | 'error'
  const [clientSecret, setClientSecret] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await startCheckout();
        if (cancelled) return;
        if (!data?.clientSecret) throw new Error("No client secret returned");
        setClientSecret(data.clientSecret);
        setStep("payment");
      } catch (err) {
        if (cancelled) return;
        setErrorMsg(err?.data?.message || err?.message || "Couldn't start checkout.");
        setStep("error");
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    if (busy) return;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4">
      <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">{title}</h2>
            {subtitle && <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={handleClose}
            disabled={busy}
            className="text-gray-500 hover:text-white transition p-1 disabled:opacity-30"
          >
            <FiX size={20} />
          </button>
        </div>

        {step === "loading" && (
          <p className="text-center text-gray-400 py-10 text-sm">Setting up your subscription…</p>
        )}

        {step === "error" && (
          <div className="text-center py-6 space-y-4">
            <p className="text-red-400 text-sm">{errorMsg}</p>
            <button onClick={onClose} className="text-gray-400 text-sm hover:text-white">
              Close
            </button>
          </div>
        )}

        {step === "payment" && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CardForm
              clientSecret={clientSecret}
              priceLabel={priceLabel}
              onCancel={onClose}
              busy={busy}
              setBusy={setBusy}
              onSuccess={() => {
                toast.success("Subscribed!");
                onSuccess?.();
              }}
            />
          </Elements>
        )}
      </div>
    </div>
  );
}
