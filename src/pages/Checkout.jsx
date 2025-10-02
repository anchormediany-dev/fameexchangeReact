import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiMapPin,
  FiUser,
  FiPhone,
  FiMail,
  FiArrowLeft,
  FiCreditCard,
  FiLock,
  FiHome,
  FiCheck,
  FiFileText,
} from "react-icons/fi";
import {
  useGetEventByIdQuery,
  useAddIntentMutation,
  useConfirmPaymentMutation,
} from "../app/authApi";
import { useAuth } from "../utils/auth/useAuth";

// Stripe imports
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CDN_BASE = import.meta.env.VITE_API_IMAGE_BASE_URL || "";
const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop";
const FALLBACK_LOGO_PLACEHOLDER = "https://placehold.co/80x80/png?text=LOGO";

const resolveImage = (p) => {
  if (!p) return "";
  if (/^https?:|^data:/.test(p)) return p;
  const normalized = p.replace(/\\/g, "/");
  const base = CDN_BASE.replace(/\/$/, "");
  const path = normalized.replace(/^\//, "");
  return `${base}/${path}`;
};

const currency = (n) =>
  typeof n === "number"
    ? n.toLocaleString(undefined, { style: "currency", currency: "USD" })
    : "";

// Stripe Payment Form Component
function StripePaymentForm({
  clientSecret,
  totalAmount,
  attendees,
  billingDetails,
  onPaymentSuccess,
  onPaymentError,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [confirmPayment, { isLoading: isConfirming }] =
    useConfirmPaymentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    const cardElement = elements.getElement(CardElement);

    try {
      // Confirm card payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: billingDetails.name,
              email: billingDetails.email,
              phone: billingDetails.phone,
              address: {
                line1: billingDetails.address.line1,
                line2: billingDetails.address.line2,
                city: billingDetails.address.city,
                state: billingDetails.address.state,
                postal_code: billingDetails.address.postal_code,
                country: billingDetails.address.country,
              },
            },
          },
        }
      );

      if (error) {
        setPaymentError(error.message);
        onPaymentError(error.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // Call your confirmation API
        try {
          const confirmResult = await confirmPayment({
            paymentIntentId: paymentIntent.id,
            paymentMethodId: paymentIntent.payment_method,
          }).unwrap();

          console.log("Payment confirmed with backend:", confirmResult);

          // Pass both Stripe payment intent and confirmation result
          onPaymentSuccess({
            stripePaymentIntent: paymentIntent,
            confirmation: confirmResult,
          });
        } catch (confirmationError) {
          console.error("Confirmation API error:", confirmationError);
          // Even if confirmation fails, the payment succeeded in Stripe
          onPaymentSuccess({
            stripePaymentIntent: paymentIntent,
            confirmation: null,
            confirmationError: confirmationError,
          });
        }
      } else {
        setPaymentError(`Payment status: ${paymentIntent.status}`);
        onPaymentError(`Payment status: ${paymentIntent.status}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError("An unexpected error occurred. Please try again.");
      onPaymentError("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#ffffff",
        fontFamily: '"Inter", sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#6B7280",
        },
        backgroundColor: "#171717",
      },
      invalid: {
        color: "#EF4444",
        iconColor: "#EF4444",
      },
    },
    hidePostalCode: true,
  };

  const isLoading = isProcessing || isConfirming;

  return (
    <div className="bg-[#222222] border border-[#333333] rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FiCreditCard className="w-5 h-5" />
        Payment Details
      </h2>

      {paymentError && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-300 text-sm">
          {paymentError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-[#171717] border border-[#333333] rounded-lg p-4">
          <CardElement options={cardElementOptions} />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <FiLock className="w-3 h-3" />
          <span>Your payment is secure and encrypted</span>
        </div>

        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full gradient-bg text-black font-bold py-4 px-6 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-[#F3BA18]/20"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              {isConfirming ? "Confirming Payment..." : "Processing Payment..."}
            </div>
          ) : (
            `Complete Payment - ${currency(totalAmount)}`
          )}
        </button>
      </form>
    </div>
  );
}

// Billing Address Form Component
function BillingAddressForm({
  attendees,
  onNext,
  onBack,
  billingDetails,
  onBillingDetailsChange,
}) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!billingDetails.name.trim()) newErrors.name = "Full name is required";
    if (!billingDetails.email.trim()) newErrors.email = "Email is required";
    if (!billingDetails.address.line1.trim())
      newErrors.line1 = "Street address is required";
    if (!billingDetails.address.city.trim())
      newErrors.city = "City is required";
    if (!billingDetails.address.state.trim())
      newErrors.state = "State is required";
    if (!billingDetails.address.postal_code.trim())
      newErrors.postal_code = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleFieldChange = (field, value) => {
    onBillingDetailsChange(field, value);
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddressChange = (field, value) => {
    onBillingDetailsChange("address", {
      ...billingDetails.address,
      [field]: value,
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="bg-[#222222] border border-[#333333] rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FiHome className="w-5 h-5" />
        Billing Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={billingDetails.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className={`w-full bg-[#171717] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                errors.name
                  ? "border-red-500"
                  : "border-[#333333] focus:border-[#F3BA18]"
              }`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <FiMail className="w-4 h-4" />
              Email *
            </label>
            <input
              type="email"
              required
              value={billingDetails.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              className={`w-full bg-[#171717] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                errors.email
                  ? "border-red-500"
                  : "border-[#333333] focus:border-[#F3BA18]"
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <FiPhone className="w-4 h-4" />
              Phone
            </label>
            <input
              type="tel"
              value={billingDetails.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F3BA18] transition-colors"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-300 flex items-center gap-2">
            <FiHome className="w-4 h-4" />
            Billing Address *
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                required
                value={billingDetails.address.line1}
                onChange={(e) => handleAddressChange("line1", e.target.value)}
                className={`w-full bg-[#171717] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                  errors.line1
                    ? "border-red-500"
                    : "border-[#333333] focus:border-[#F3BA18]"
                }`}
                placeholder="Enter street address"
              />
              {errors.line1 && (
                <p className="text-red-400 text-xs mt-1">{errors.line1}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Apt, Suite, etc. (Optional)
              </label>
              <input
                type="text"
                value={billingDetails.address.line2}
                onChange={(e) => handleAddressChange("line2", e.target.value)}
                className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F3BA18] transition-colors"
                placeholder="Apt, suite, unit, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={billingDetails.address.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  className={`w-full bg-[#171717] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                    errors.city
                      ? "border-red-500"
                      : "border-[#333333] focus:border-[#F3BA18]"
                  }`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={billingDetails.address.state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  className={`w-full bg-[#171717] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                    errors.state
                      ? "border-red-500"
                      : "border-[#333333] focus:border-[#F3BA18]"
                  }`}
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="text-red-400 text-xs mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  value={billingDetails.address.postal_code}
                  onChange={(e) =>
                    handleAddressChange("postal_code", e.target.value)
                  }
                  className={`w-full bg-[#171717] border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                    errors.postal_code
                      ? "border-red-500"
                      : "border-[#333333] focus:border-[#F3BA18]"
                  }`}
                  placeholder="Enter ZIP code"
                />
                {errors.postal_code && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.postal_code}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Country *
                </label>
                <select
                  value={billingDetails.address.country}
                  onChange={(e) =>
                    handleAddressChange("country", e.target.value)
                  }
                  className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F3BA18] transition-colors"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-[#2d2d2d] border border-[#333333] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#333333] transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 gradient-bg text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#F3BA18]/20"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
}

// Confirmation Component
function ConfirmationStep({
  paymentResult,
  event,
  attendees,
  totalAmount,
  billingDetails,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#222222] border border-[#333333] rounded-2xl p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheck className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-green-400 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-400">Your tickets have been confirmed</p>
      </div>

      <div className="space-y-6">
        {/* Order Summary */}
        <div className="bg-[#2d2d2d] border border-[#333333] rounded-xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FiFileText className="w-4 h-4" />
            Order Summary
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Order ID:</span>
              <span className="font-mono">
                {paymentResult.stripePaymentIntent.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Amount Paid:</span>
              <span className="font-semibold">{currency(totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tickets:</span>
              <span>{attendees.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400 font-semibold">
                {paymentResult.confirmation ? "Confirmed" : "Processed"}
              </span>
            </div>
          </div>
        </div>

        {/* Attendee List */}
        <div>
          <h3 className="font-semibold mb-3">Attendee Tickets</h3>
          <div className="space-y-2">
            {attendees.map((attendee, index) => (
              <div
                key={index}
                className="bg-[#2d2d2d] border border-[#333333] rounded-lg p-3"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      {attendee.firstName} {attendee.lastName}
                    </p>
                    <p className="text-sm text-gray-400">{attendee.email}</p>
                    <p className="text-xs text-gray-500">{attendee.phone}</p>
                  </div>
                  <span className="text-xs bg-[#171717] px-2 py-1 rounded-full">
                    Ticket {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-[#2d2d2d] border border-[#333333] rounded-xl p-4">
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• E-tickets will be sent to {billingDetails.email}</li>
            <li>• Bring your ID and confirmation to the event</li>
            <li>• Check your email for event updates</li>
          </ul>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full gradient-bg text-black font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#F3BA18]/20"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

// Main Checkout Component
function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading } = useGetEventByIdQuery(id, { skip: !id });
  const [addIntent, { isLoading: isCreatingIntent, error: intentError }] =
    useAddIntentMutation();

  // Initialize with empty email for each attendee (not from user)
  const [attendees, setAttendees] = useState([
    { firstName: "", lastName: "", phone: "", email: "" },
  ]);

  const [currentStep, setCurrentStep] = useState("attendees"); // 'attendees', 'billing', 'payment', 'confirmation'
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);

  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "", // Don't pre-fill from user
    phone: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US",
    },
  });

  const event = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#171717] text-gray-300 p-8 flex items-center justify-center">
        <div className="animate-pulse">Loading checkout...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center p-6">
        <div className="bg-[#222222] border border-[#333333] rounded-xl p-8 max-w-lg w-full text-center text-white">
          <p className="text-lg font-semibold mb-2">Event not found</p>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg gradient-bg text-white font-semibold cursor-pointer mt-4"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const when =
    event?.datetime &&
    new Date(event.datetime).toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const hasDiscount = (event?.discount_percent || 0) > 0;
  const finalPrice = hasDiscount
    ? (event?.regular_price || 0) * (1 - (event.discount_percent || 0) / 100)
    : event?.regular_price;

  const cover = resolveImage(event?.event_cover) || FALLBACK_COVER;
  const logo = resolveImage(event?.logo) || FALLBACK_LOGO_PLACEHOLDER;

  const totalAmount = finalPrice * attendees.length;

  const handleAddAttendee = () => {
    setAttendees([
      ...attendees,
      { firstName: "", lastName: "", phone: "", email: "" },
    ]);
  };

  const handleRemoveAttendee = (index) => {
    if (attendees.length > 1) {
      const newAttendees = attendees.filter((_, i) => i !== index);
      setAttendees(newAttendees);
    }
  };

  const handleAttendeeChange = (index, field, value) => {
    const newAttendees = [...attendees];
    newAttendees[index][field] = value;
    setAttendees(newAttendees);
  };

  const handleBillingDetailsChange = (field, value) => {
    setBillingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreatePaymentIntent = async () => {
    if (!allAttendeesValid) {
      alert("Please fill in all attendee information correctly.");
      return;
    }

    try {
      // Prepare attendees data in the required format
      const formattedAttendees = attendees.map((attendee) => ({
        fullName: `${attendee.firstName} ${attendee.lastName}`.trim(),
        email: attendee.email,
        phone: attendee.phone,
      }));

      // Prepare the request body according to the endpoint specification
      const paymentIntentData = {
        eventId: id,
        type: "event",
        currency: "usd",
        no_of_persons: attendees.length,
        attendees: formattedAttendees,
      };

      console.log("Creating payment intent with data:", paymentIntentData);

      // Call the RTK Query mutation
      const result = await addIntent(paymentIntentData).unwrap();

      console.log("Payment intent created successfully:", result);

      if (result.success && result.clientSecret) {
        setPaymentIntent(result);
        setCurrentStep("billing");
      } else {
        throw new Error("Failed to create payment intent");
      }
    } catch (error) {
      console.error("Failed to create payment intent:", error);
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        "Failed to create payment intent. Please try again.";
      alert(`Payment Error: ${errorMessage}`);
    }
  };

  const handlePaymentSuccess = (paymentResult) => {
    console.log("Payment succeeded with result:", paymentResult);
    setPaymentResult(paymentResult);
    setCurrentStep("confirmation");
  };

  const handlePaymentError = (errorMessage) => {
    console.error("Payment failed:", errorMessage);
    alert(`Payment failed: ${errorMessage}`);
  };

  const allAttendeesValid = attendees.every(
    (attendee) =>
      attendee.firstName &&
      attendee.lastName &&
      attendee.phone &&
      attendee.email
  );

  const steps = [
    { id: "attendees", name: "Attendee Info", number: 1 },
    { id: "billing", name: "Billing Address", number: 2 },
    { id: "payment", name: "Payment", number: 3 },
    { id: "confirmation", name: "Confirmation", number: 4 },
  ];

  const getCurrentStepIndex = () =>
    steps.findIndex((step) => step.id === currentStep);

  const renderStepContent = () => {
    switch (currentStep) {
      case "attendees":
        return (
          <div className="space-y-6">
            <div className="bg-[#222222] border border-[#333333] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiUser className="w-5 h-5" />
                  Attendee Information
                </h2>
                <span className="text-sm text-gray-400">
                  {attendees.length}{" "}
                  {attendees.length === 1 ? "attendee" : "attendees"}
                </span>
              </div>

              <div className="space-y-6">
                {attendees.map((attendee, index) => (
                  <div
                    key={index}
                    className="border border-[#333333] rounded-xl p-5 bg-[#2d2d2d]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">
                        Attendee {index + 1}
                      </h3>
                      {attendees.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAttendee(index)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={attendee.firstName}
                          onChange={(e) =>
                            handleAttendeeChange(
                              index,
                              "firstName",
                              e.target.value
                            )
                          }
                          className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F3BA18] transition-colors"
                          placeholder="Enter first name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={attendee.lastName}
                          onChange={(e) =>
                            handleAttendeeChange(
                              index,
                              "lastName",
                              e.target.value
                            )
                          }
                          className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F3BA18] transition-colors"
                          placeholder="Enter last name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                          <FiPhone className="w-4 h-4" />
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={attendee.phone}
                          onChange={(e) =>
                            handleAttendeeChange(index, "phone", e.target.value)
                          }
                          className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F3BA18] transition-colors"
                          placeholder="Enter phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                          <FiMail className="w-4 h-4" />
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={attendee.email}
                          onChange={(e) =>
                            handleAttendeeChange(index, "email", e.target.value)
                          }
                          className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F3BA18] transition-colors"
                          placeholder="Enter attendee email"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddAttendee}
                className="w-full mt-4 border-2 border-dashed border-[#333333] rounded-xl py-4 text-gray-400 hover:text-white hover:border-[#F3BA18] transition-colors"
              >
                + Add Another Attendee
              </button>
            </div>

            <button
              onClick={handleCreatePaymentIntent}
              disabled={!allAttendeesValid || isCreatingIntent}
              className="w-full gradient-bg text-black font-bold py-4 px-6 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-[#F3BA18]/20"
            >
              {isCreatingIntent ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Creating Payment...
                </div>
              ) : (
                `Continue to Billing - ${currency(totalAmount)}`
              )}
            </button>
          </div>
        );

      case "billing":
        return (
          <BillingAddressForm
            attendees={attendees}
            billingDetails={billingDetails}
            onBillingDetailsChange={handleBillingDetailsChange}
            onNext={() => setCurrentStep("payment")}
            onBack={() => setCurrentStep("attendees")}
          />
        );

      case "payment":
        return (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: paymentIntent.clientSecret }}
          >
            <StripePaymentForm
              clientSecret={paymentIntent.clientSecret}
              totalAmount={totalAmount}
              attendees={attendees}
              billingDetails={billingDetails}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          </Elements>
        );

      case "confirmation":
        return (
          <ConfirmationStep
            paymentResult={paymentResult}
            event={event}
            attendees={attendees}
            totalAmount={totalAmount}
            billingDetails={billingDetails}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => {
              if (currentStep === "attendees") {
                navigate(-1);
              } else {
                const currentIndex = getCurrentStepIndex();
                if (currentIndex > 0) {
                  setCurrentStep(steps[currentIndex - 1].id);
                }
              }
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <FiArrowLeft className="w-5 h-5" />
            {currentStep === "attendees" ? "Back to Event" : "Back"}
          </button>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-400 mt-2">
            Complete your ticket purchase for {event.title}
          </p>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-8 max-w-2xl">
            {steps.map((step, index) => {
              const isCompleted = index < getCurrentStepIndex();
              const isCurrent = step.id === currentStep;
              const isConfirmation = step.id === "confirmation";

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        isCompleted || isCurrent || isConfirmation
                          ? "bg-[#F3BA18] text-black"
                          : "bg-[#2d2d2d] text-gray-400"
                      }`}
                    >
                      {isCompleted || isConfirmation ? (
                        <FiCheck className="w-5 h-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 text-center ${
                        isCompleted || isCurrent || isConfirmation
                          ? "text-[#F3BA18]"
                          : "text-gray-400"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 ${
                        index < getCurrentStepIndex()
                          ? "bg-[#F3BA18]"
                          : "bg-[#333333]"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Display */}
        {intentError && currentStep === "attendees" && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-xl text-red-300">
            <p className="font-semibold">Payment Error</p>
            <p className="text-sm mt-1">
              {intentError?.data?.message ||
                "Failed to process payment. Please try again."}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">{renderStepContent()}</div>

          {/* Sidebar - Event Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-[#222222] border border-[#333333] rounded-2xl overflow-hidden">
                {/* Event Header */}
                <div
                  className="h-32 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${cover})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <img
                      src={logo}
                      alt="Event logo"
                      className="w-12 h-12 rounded-lg object-cover border border-[#333333] bg-[#222222]"
                    />
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>

                  {when && (
                    <div className="flex items-center gap-3 text-gray-300 mb-3">
                      <FiCalendar className="w-4 h-4 gredient-icon" />
                      <span className="text-sm">{when}</span>
                    </div>
                  )}

                  {event.location && (
                    <div className="flex items-center gap-3 text-gray-300 mb-4">
                      <FiMapPin className="w-4 h-4 gredient-icon" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  )}

                  {/* Price Summary */}
                  <div className="border-t border-[#333333] pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Ticket Price</span>
                      <span className="font-semibold">
                        {currency(finalPrice)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Quantity</span>
                      <span className="font-semibold">{attendees.length}</span>
                    </div>

                    {hasDiscount && (
                      <div className="flex justify-between items-center text-green-400">
                        <span>Discount</span>
                        <span>-{event.discount_percent}%</span>
                      </div>
                    )}

                    <div className="border-t border-[#333333] pt-3">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span className="gredient-icon">
                          {currency(totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
