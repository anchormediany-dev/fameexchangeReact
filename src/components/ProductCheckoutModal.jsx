import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FiLock, FiCreditCard, FiX } from "react-icons/fi";
import {
  useAddIntentMutation,
  useConfirmPaymentMutation,
} from "../app/authApi";
import { imgSrc } from "../utils/imgSrc";

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
  hidePostalCode: false,
};

function CheckoutForm({ product, onClose, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((s) => s.auth.user);

  const [addIntent] = useAddIntentMutation();
  const [confirmPayment] = useConfirmPaymentMutation();
  const [processing, setProcessing] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    addressLine: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    postalCode: user?.zipCode || user?.postalCode || "",
    country: user?.country || "",
  });

  const setField = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const amount = useMemo(() => {
    const n = parseFloat(product?.price);
    return isNaN(n) ? 0 : n;
  }, [product?.price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    if (!form.fullName.trim()) return setErrMsg("Full name is required");
    if (!form.email.trim()) return setErrMsg("Email is required");
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return setErrMsg("Enter a valid email");
    if (!amount || amount <= 0) return setErrMsg("Invalid product price");
    if (!stripe || !elements)
      return setErrMsg("Payment system not ready, please retry");

    setProcessing(true);
    try {
      // 1. Create PaymentIntent on the backend
      const intent = await addIntent({
        amount,
        currency: "usd",
        productId: product?._id,
        productTitle: product?.title,
        quantity: 1,
        customer: {
          name: form.fullName,
          email: form.email,
          phone: form.phone || undefined,
          address: {
            line1: form.addressLine || undefined,
            city: form.city || undefined,
            state: form.state || undefined,
            postal_code: form.postalCode || undefined,
            country: form.country || undefined,
          },
        },
      }).unwrap();

      const clientSecret = intent?.clientSecret || intent?.client_secret;
      if (!clientSecret) {
        throw new Error("Payment intent did not return a client secret");
      }

      // 2. Confirm the card payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: form.fullName,
              email: form.email,
              phone: form.phone || undefined,
              address: {
                line1: form.addressLine || undefined,
                city: form.city || undefined,
                state: form.state || undefined,
                postal_code: form.postalCode || undefined,
                country: form.country || undefined,
              },
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

      // 3. Notify backend to record the order (idempotent)
      try {
        await confirmPayment({
          paymentIntentId: paymentIntent.id,
          productId: product?._id,
          customer: {
            name: form.fullName,
            email: form.email,
            phone: form.phone || undefined,
            address: {
              line1: form.addressLine || undefined,
              city: form.city || undefined,
              state: form.state || undefined,
              postal_code: form.postalCode || undefined,
              country: form.country || undefined,
            },
          },
        }).unwrap();
      } catch {
        // Order recording is best-effort; payment already succeeded.
      }

      toast.success(`Payment successful! Thanks, ${form.fullName}.`);
      onSuccess?.(paymentIntent);
      onClose?.();
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Failed to complete the payment. Please try again.";
      setErrMsg(msg);
    } finally {
      setProcessing(false);
    }
  };

  const inputCls =
    "w-full px-3 py-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:outline-none text-sm placeholder:text-gray-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product summary */}
      {product && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0f0f0f] border border-[#2a2a2a]">
          {product.image && (
            <img
              src={imgSrc(product.image)}
              alt={product.title}
              className="w-16 h-16 rounded-lg object-contain bg-black/40"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate">
              {product.title}
            </div>
            <div className="text-xs text-gray-400">Qty 1</div>
          </div>
          <div className="text-base font-bold text-[#c9a227] whitespace-nowrap">
            ${amount.toFixed(2)}
          </div>
        </div>
      )}

      {/* Required customer fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-semibold text-gray-400 mb-1 uppercase tracking-wider">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.fullName}
            onChange={setField("fullName")}
            required
            className={inputCls}
            placeholder="John Doe"
            autoComplete="name"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-semibold text-gray-400 mb-1 uppercase tracking-wider">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={setField("email")}
            required
            className={inputCls}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        {/* Optional fields */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-semibold text-gray-400 mb-1 uppercase tracking-wider">
            Phone <span className="text-gray-600">(optional)</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={setField("phone")}
            className={inputCls}
            placeholder="+1 555 000 0000"
            autoComplete="tel"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-semibold text-gray-400 mb-1 uppercase tracking-wider">
            Address <span className="text-gray-600">(optional)</span>
          </label>
          <input
            type="text"
            value={form.addressLine}
            onChange={setField("addressLine")}
            className={inputCls}
            placeholder="Street address"
            autoComplete="street-address"
          />
        </div>
        <div>
          <input
            type="text"
            value={form.city}
            onChange={setField("city")}
            className={inputCls}
            placeholder="City"
            autoComplete="address-level2"
          />
        </div>
        <div>
          <input
            type="text"
            value={form.state}
            onChange={setField("state")}
            className={inputCls}
            placeholder="State / Region"
            autoComplete="address-level1"
          />
        </div>
        <div>
          <input
            type="text"
            value={form.postalCode}
            onChange={setField("postalCode")}
            className={inputCls}
            placeholder="Postal Code"
            autoComplete="postal-code"
          />
        </div>
        <div>
          <input
            type="text"
            value={form.country}
            onChange={setField("country")}
            className={inputCls}
            placeholder="Country"
            autoComplete="country-name"
          />
        </div>
      </div>

      {/* Card */}
      <div>
        <label className="block text-[11px] font-semibold text-gray-400 mb-1 uppercase tracking-wider">
          Card Details <span className="text-red-400">*</span>
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
        disabled={processing || !stripe}
        className="w-full bg-[#c9a227] text-black py-3 rounded-lg font-semibold hover:bg-[#dbb934] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        <FiCreditCard className="w-4 h-4" />
        {processing ? "Processing…" : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
}

const ProductCheckoutModal = ({ product, onClose, onSuccess }) => {
  if (!product) return null;
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#111111] border border-[#2a2a2a] rounded-2xl w-full max-w-lg p-6 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl leading-none cursor-pointer"
          aria-label="Close"
        >
          <FiX className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-white mb-1">Checkout</h3>
        <p className="text-gray-500 text-sm mb-5">
          Complete your purchase securely with Stripe in one step.
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutForm
            product={product}
            onClose={onClose}
            onSuccess={onSuccess}
          />
        </Elements>
      </div>
    </div>
  );
};

export default ProductCheckoutModal;
