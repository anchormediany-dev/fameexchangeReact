import { useState } from "react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FiLock, FiCreditCard } from "react-icons/fi";
import {
  useCreateDepositIntentMutation,
  useConfirmDepositMutation,
} from "../../app/tradingApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const cardOptions = {
  style: {
    base: {
      color: "#ffffff",
      fontFamily: '"Inter", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "15px",
      "::placeholder": { color: "#6B7280" },
      backgroundColor: "transparent",
    },
    invalid: { color: "#EF4444", iconColor: "#EF4444" },
  },
  hidePostalCode: true,
};

const PRESETS = [50, 100, 500, 1000];

function DepositForm({ onClose, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [createIntent] = useCreateDepositIntentMutation();
  const [confirmDeposit] = useConfirmDepositMutation();

  const handleDeposit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    const val = parseFloat(amount);
    if (!val || val < 1) {
      setErrMsg("Enter an amount of at least $1");
      return;
    }
    if (val > 100000) {
      setErrMsg("Maximum deposit is $100,000 per transaction");
      return;
    }
    if (!stripe || !elements) {
      setErrMsg("Payment system not ready, please retry");
      return;
    }

    setProcessing(true);
    try {
      // 1. Create PaymentIntent on the backend
      const intent = await createIntent({ amount: val }).unwrap();

      // 2. Confirm the card payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        intent.clientSecret,
        { payment_method: { card: cardElement } }
      );

      if (error) {
        setErrMsg(error.message || "Card was declined");
        return;
      }

      if (paymentIntent?.status !== "succeeded") {
        setErrMsg(`Payment ${paymentIntent?.status || "did not complete"}`);
        return;
      }

      // 3. Credit the wallet (idempotent on backend)
      const result = await confirmDeposit({
        paymentIntentId: paymentIntent.id,
      }).unwrap();

      const newBal = result?.wallet?.available_balance;
      toast.success(
        `Wallet funded. New balance: $${
          typeof newBal === "number" ? newBal.toFixed(2) : newBal
        }`
      );
      onSuccess?.(result);
      onClose();
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Failed to deposit funds. Please try again.";
      setErrMsg(msg);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleDeposit} className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
          Amount (USD)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-7 pr-3 py-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm font-mono"
            placeholder="0.00"
            autoFocus
          />
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(String(preset))}
              className="text-xs py-2 border border-[#2a2a2a] rounded-lg text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-colors"
            >
              ${preset.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
          Card Details
        </label>
        <div className="border border-[#2a2a2a] bg-[#0f0f0f] rounded-lg p-3">
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
        disabled={processing || !stripe || !amount}
        className="w-full bg-[#c9a227] text-black py-3 rounded-lg font-semibold hover:bg-[#dbb934] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        <FiCreditCard className="w-4 h-4" />
        {processing ? "Processing..." : `Deposit ${amount ? `$${amount}` : ""}`}
      </button>
    </form>
  );
}

const DepositModal = ({ onClose, onSuccess }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl leading-none cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold text-white mb-1">Add Funds</h3>
        <p className="text-gray-500 text-sm mb-5">
          Top up your trading wallet via secure card payment.
        </p>

        <Elements stripe={stripePromise}>
          <DepositForm onClose={onClose} onSuccess={onSuccess} />
        </Elements>
      </div>
    </div>
  );
};

export default DepositModal;
