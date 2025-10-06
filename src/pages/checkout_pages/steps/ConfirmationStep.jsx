import { useSelector } from "react-redux";
import {
  selectPaymentResult,
  selectAttendees,
  selectBilling,
} from "../../../features/checkout/checkoutSelectors";
import { FiCheck, FiFileText } from "react-icons/fi";
import { currency } from "../utils";
import { useNavigate } from "react-router-dom";

export default function ConfirmationStep() {
  const navigate = useNavigate();
  const paymentResult = useSelector(selectPaymentResult);
  const attendees = useSelector(selectAttendees);
  const billing = useSelector(selectBilling);

  if (!paymentResult?.stripePaymentIntent) {
    return <div className="text-red-300">No payment found.</div>;
  }

  const totalAmount = attendees.length * 1; // adjust if you want to re-calc price here

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
              <span className="font-semibold">
                {currency(
                  (paymentResult.stripePaymentIntent.amount_received || 0) / 100
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tickets:</span>
              <span>{attendees.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Receipt to:</span>
              <span className="text-gray-300">{billing.email}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Attendee Tickets</h3>
          <div className="space-y-2">
            {attendees.map((a, i) => (
              <div
                key={i}
                className="bg-[#2d2d2d] border border-[#333333] rounded-lg p-3"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      {a.firstName} {a.lastName}
                    </p>
                    <p className="text-sm text-gray-400">{a.email}</p>
                    <p className="text-xs text-gray-500">{a.phone}</p>
                  </div>
                  <span className="text-xs bg-[#171717] px-2 py-1 rounded-full">
                    Ticket {i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full gradient-bg text-black font-bold py-4 px-6 rounded-xl text-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
