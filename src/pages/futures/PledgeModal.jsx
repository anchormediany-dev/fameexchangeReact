import { useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStartFanPledgeMutation, useConfirmFanPledgeMutation } from "../../app/tradingApi";
import { toast } from "react-toastify";
import { FiX, FiLock, FiStar } from "react-icons/fi";
import fameCoin from "../../assets/home/thecoin.png";

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

const MIN = 5;
const MAX = 50000;
const BONUS = 15;

// ── Inner payment form (needs stripe + elements context) ─────────────────────
function CardForm({ clientSecret, paymentIntentId, talent, amount, onSuccess, onCancel, busy, setBusy }) {
  const stripe = useStripe();
  const elements = useElements();
  const [confirmFanPledge] = useConfirmFanPledgeMutation();
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

    if (paymentIntent.status === "succeeded") {
      try {
        const result = await confirmFanPledge({ paymentIntentId }).unwrap();
        onSuccess(result);
      } catch (err) {
        toast.error(err?.data?.message || "Pledge confirmed with Stripe but failed to record. Contact support.");
        setBusy(false);
      }
    } else {
      setCardError(`Unexpected payment status: ${paymentIntent.status}`);
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Summary */}
      <div className="bg-[#2a2a2a] rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">{talent.name}</p>
          <p className="text-gray-400 text-xs mt-0.5">${talent.symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-[#F3BA18] font-bold text-lg">${Number(amount).toLocaleString()}</p>
          <p className="text-emerald-400 text-xs mt-0.5">+{BONUS}% bonus shares on grad</p>
        </div>
      </div>

      {/* Card field */}
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
          {busy ? "Processing…" : `Pledge $${Number(amount).toLocaleString()}`}
        </button>
      </div>
    </form>
  );
}

// ── Main modal ───────────────────────────────────────────────────────────────
export default function PledgeModal({ talent, onClose }) {
  const [step, setStep] = useState("amount"); // 'amount' | 'payment' | 'success'
  const [amount, setAmount] = useState(25);
  const [amountError, setAmountError] = useState("");
  const [intentData, setIntentData] = useState(null); // { clientSecret, paymentIntentId }
  const [, setSuccessData] = useState(null);
  const [busy, setBusy] = useState(false); // true while Stripe/backend confirmation is in flight

  const [startFanPledge, { isLoading: starting }] = useStartFanPledgeMutation();

  const handleClose = () => {
    if (busy) return; // don't let a charge-in-progress get dismissed with no confirmation
    onClose();
  };

  const handleAmountSubmit = async (e) => {
    e.preventDefault();
    const n = Number(amount);
    if (isNaN(n) || n < MIN) { setAmountError(`Minimum pledge is $${MIN}`); return; }
    if (n > MAX) { setAmountError(`Maximum pledge is $${MAX.toLocaleString()}`); return; }
    setAmountError("");
    try {
      const data = await startFanPledge({ talentId: talent._id, amount: n }).unwrap();
      setIntentData({ clientSecret: data.clientSecret, paymentIntentId: data.paymentIntentId });
      setStep("payment");
    } catch (err) {
      setAmountError(err?.data?.message || "Couldn't create pledge. Please try again.");
    }
  };

  const handleSuccess = (result) => {
    setSuccessData(result);
    setStep("success");
    toast.success("Pledge confirmed!");
  };

  const titles = {
    amount: "Pledge Your Support",
    payment: "Secure Payment",
    success: "Pledge Confirmed! 🎉",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4">
      <div className="bg-[#1f1f1f] border border-[#333] rounded-2xl w-full max-w-md p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">{titles[step]}</h2>
          <button
            onClick={handleClose}
            disabled={busy}
            title={busy ? "Please wait for your payment to finish processing" : undefined}
            className="text-gray-500 hover:text-white transition p-1 disabled:opacity-30 disabled:hover:text-gray-500"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Step: amount */}
        {step === "amount" && (
          <form onSubmit={handleAmountSubmit} className="space-y-5">
            {/* Talent chip */}
            <div className="flex items-center gap-3 bg-[#2a2a2a] rounded-xl p-3">
              {talent.image ? (
                <img src={talent.image} alt={talent.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-[#F3BA18] font-bold flex-shrink-0">
                  {talent.name?.[0]?.toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-white font-semibold text-sm">{talent.name}</p>
                <p className="text-gray-400 text-xs">${talent.symbol} · FameScore {talent.fame_score?.toFixed(0)}</p>
              </div>
            </div>

            {/* Bonus callout */}
            <div className="bg-emerald-950/40 border border-emerald-700/30 rounded-xl p-3 flex items-start gap-2">
              <FiStar className="text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className="text-emerald-300 text-xs leading-relaxed">
                Earn <span className="font-bold">{BONUS}% bonus shares</span> allocated at graduation price — rewarding early believers.
              </p>
            </div>

            {/* Amount input */}
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                Pledge Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                <input
                  type="number"
                  min={MIN}
                  max={MAX}
                  step="1"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setAmountError(""); }}
                  className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#F3BA18] transition"
                />
              </div>
              {/* Quick picks */}
              <div className="flex gap-2 mt-2">
                {[10, 25, 50, 100].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => { setAmount(v); setAmountError(""); }}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold border transition ${
                      Number(amount) === v
                        ? "border-[#F3BA18] text-[#F3BA18] bg-[#F3BA18]/10"
                        : "border-[#444] text-gray-400 hover:border-gray-400"
                    }`}
                  >
                    ${v}
                  </button>
                ))}
              </div>
              {amountError && <p className="text-red-400 text-xs mt-2">{amountError}</p>}
            </div>

            <p className="text-gray-500 text-xs">
              Min ${MIN} · Max ${MAX.toLocaleString()} · You'll only be charged if the campaign succeeds or at the time of pledge.
            </p>

            <button
              type="submit"
              disabled={starting}
              className="w-full custom-button-two py-3 rounded-lg font-semibold text-sm disabled:opacity-50"
            >
              {starting ? "Setting up…" : "Continue to Payment →"}
            </button>
          </form>
        )}

        {/* Step: payment */}
        {step === "payment" && intentData && (
          <Elements stripe={stripePromise} options={{ clientSecret: intentData.clientSecret }}>
            <CardForm
              clientSecret={intentData.clientSecret}
              paymentIntentId={intentData.paymentIntentId}
              talent={talent}
              amount={amount}
              onSuccess={handleSuccess}
              onCancel={() => setStep("amount")}
              busy={busy}
              setBusy={setBusy}
            />
          </Elements>
        )}

        {/* Step: success */}
        {step === "success" && (
          <div className="text-center space-y-4 py-4">
            <img src={fameCoin} alt="" className="w-14 h-14 mx-auto" />
            <div>
              <p className="text-white font-bold text-lg">You're in! 🌟</p>
              <p className="text-gray-400 text-sm mt-1">
                Your <span className="text-[#F3BA18] font-semibold">${Number(amount).toLocaleString()}</span> pledge for{" "}
                <span className="text-white font-semibold">{talent.name}</span> is recorded.
              </p>
            </div>
            <div className="bg-[#2a2a2a] rounded-xl p-4 text-left space-y-2">
              <p className="text-gray-400 text-xs">What happens next:</p>
              <ul className="text-gray-300 text-xs space-y-1">
                <li>• When {talent.name} hits FameScore 400, they graduate to tradeable</li>
                <li>• You'll receive shares + <span className="text-emerald-400 font-semibold">{BONUS}% bonus</span> at graduation price</li>
                <li>• Refund available within 90 days if graduation doesn't happen</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://famefutures.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block custom-button-two py-3 rounded-lg font-semibold text-sm"
              >
                Track on Fame Futures →
              </a>
              <button
                onClick={onClose}
                className="text-gray-500 text-sm hover:text-gray-300 transition py-1"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
