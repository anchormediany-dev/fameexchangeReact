import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { stripePromise, currency } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBilling,
  selectAttendees,
  selectPaymentIntent,
} from "../../../features/checkout/checkoutSelectors";
import { setPaymentResult } from "../../../features/checkout/checkoutSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FiCreditCard, FiLock } from "react-icons/fi";
import { useConfirmPaymentMutation } from "../../../app/authApi";
import React from "react";
function CardForm({ clientSecret, totalAmount }) {
  const stripe = useStripe();
  const elements = useElements();
  const billing = useSelector(selectBilling);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [confirmPayment, { isLoading: isConfirming }] =
    useConfirmPaymentMutation();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError("");

    const card = elements.getElement(CardElement);
    const { error: err, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: billing.name,
            email: billing.email,
            phone: billing.phone,
            address: { ...billing.address },
          },
        },
      }
    );

    if (err) {
      setError(err.message || "Payment error");
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        await confirmPayment({
          paymentIntentId: paymentIntent.id,
          paymentMethodId: paymentIntent.payment_method,
        }).unwrap();
      } catch (e) {
        // proceed anyway; Stripe success is authoritative
        console.warn("Confirm API failed, but PI succeeded:", e);
      }
      dispatch(setPaymentResult({ stripePaymentIntent: paymentIntent }));
      navigate(`/checkout/${id}/confirmation`);
    } else {
      setError(`Payment status: ${paymentIntent?.status}`);
    }

    setIsProcessing(false);
  };

  return (
    <div className="bg-[#222222] border border-[#333333] rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FiCreditCard className="w-5 h-5" />
        Payment Details
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="bg-[#171717] border border-[#333333] rounded-lg p-4">
          <CardElement
            options={{
              style: {
                base: {
                  color: "#ffffff",
                  fontFamily: '"Inter", sans-serif',
                  fontSmoothing: "antialiased",
                  fontSize: "16px",
                  "::placeholder": { color: "#6B7280" },
                  backgroundColor: "#171717",
                },
                invalid: { color: "#EF4444", iconColor: "#EF4444" },
              },
              hidePostalCode: true,
            }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <FiLock className="w-3 h-3" />
          <span>Your payment is secure and encrypted</span>
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing || isConfirming}
          className="w-full gradient-bg text-black font-bold py-4 px-6 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing || isConfirming
            ? "Processing…"
            : `Complete Payment - ${currency(totalAmount)}`}
        </button>
      </form>
    </div>
  );
}

export default function PaymentStep() {
  const paymentIntent = useSelector(selectPaymentIntent);
  const attendees = useSelector(selectAttendees);
  const billing = useSelector(selectBilling);

  const totalAmount = (attendees?.length || 0) * 1; // amount is for display; Stripe uses PI amount
  if (!paymentIntent?.clientSecret)
    return (
      <div className="text-red-300">
        Missing client secret. Go back to Attendees.
      </div>
    );

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: paymentIntent.clientSecret }}
    >
      <CardForm
        clientSecret={paymentIntent.clientSecret}
        totalAmount={totalAmount}
      />
    </Elements>
  );
}
