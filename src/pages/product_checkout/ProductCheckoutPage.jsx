import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FiLock, FiCreditCard, FiArrowLeft } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCreateProductPaymentIntentMutation } from "../../app/authApi";
import { imgSrc } from "../../utils/imgSrc";
import { handleImageError } from "../../utils/imagePlaceholder";

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

const inputCls =
  "w-full px-3 py-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:outline-none text-sm placeholder:text-gray-500";

function CheckoutForm({ product }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);

  const [createProductPaymentIntent] = useCreateProductPaymentIntentMutation();
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
      const intent = await createProductPaymentIntent({
        productId: product?._id,
        quantity: 1,
        currency: "usd",
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

      const clientSecret = intent?.paymentIntent?.client_secret;
      if (!clientSecret) {
        throw new Error("Payment intent did not return a client secret");
      }

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

      // No client-side confirm call needed here — the product webhook
      // (server-side, verified directly against Stripe) is the source of
      // truth for order status, stock decrement, and the confirmation
      // email once it lands, typically within a second or two.
      toast.success(`Payment successful! Thanks, ${form.fullName}.`);
      navigate("/products", { replace: true });
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        <input
          type="text"
          value={form.city}
          onChange={setField("city")}
          className={inputCls}
          placeholder="City"
          autoComplete="address-level2"
        />
        <input
          type="text"
          value={form.state}
          onChange={setField("state")}
          className={inputCls}
          placeholder="State / Region"
          autoComplete="address-level1"
        />
        <input
          type="text"
          value={form.postalCode}
          onChange={setField("postalCode")}
          className={inputCls}
          placeholder="Postal Code"
          autoComplete="postal-code"
        />
        <input
          type="text"
          value={form.country}
          onChange={setField("country")}
          className={inputCls}
          placeholder="Country"
          autoComplete="country-name"
        />
      </div>

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

const ProductCheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  // If user lands here directly (no state), bounce back to products list.
  useEffect(() => {
    if (!product) {
      navigate("/products", { replace: true });
    }
  }, [product, navigate]);

  if (!product) return null;

  const amount = parseFloat(product?.price) || 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="flex-grow pt-32 lg:pt-36 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#c9a227] transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to products
            </Link>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
            Checkout
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Complete your purchase securely with Stripe in a single step.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Order summary */}
            <aside className="lg:col-span-2 space-y-4">
              <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Order Summary
                </h2>
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img
                      src={imgSrc(product.image)}
                      alt={product.title}
                      onError={handleImageError}
                      className="max-w-full max-h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-semibold text-white">
                      {product.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Qty 1</div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#2a2a2a] space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white">${amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-white">Free</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-[#2a2a2a]">
                    <span className="text-white">Total</span>
                    <span className="text-[#c9a227]">
                      ${amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Payment form */}
            <section className="lg:col-span-3">
              <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 md:p-6">
                <Elements stripe={stripePromise}>
                  <CheckoutForm product={product} />
                </Elements>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductCheckoutPage;
