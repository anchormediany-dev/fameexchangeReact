import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectBilling } from "../../../features/checkout/checkoutSelectors";
import {
  setBillingField,
  setBillingAddressField,
} from "../../../features/checkout/checkoutSlice";
import { FiHome, FiMail, FiPhone } from "react-icons/fi";
import { useSelector as useSel } from "react-redux";
import { selectAttendees } from "../../../features/checkout/checkoutSelectors";

export default function BillingStep() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const billing = useSelector(selectBilling);
  const attendees = useSel(selectAttendees); // for back guard

  const validate = () => {
    const e = {};
    if (!billing.name.trim()) e.name = "Full name is required";
    if (!billing.email.trim()) e.email = "Email is required";
    if (!billing.address.line1.trim()) e.line1 = "Street is required";
    if (!billing.address.city.trim()) e.city = "City is required";
    if (!billing.address.state.trim()) e.state = "State is required";
    if (!billing.address.postal_code.trim()) e.postal_code = "ZIP is required";
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length) {
      alert(Object.values(e)[0]); // quick UX; swap for inline errors if you want
      return;
    }
    navigate(`/checkout/${id}/payment`);
  };

  const setF = (field, value) => dispatch(setBillingField({ field, value }));
  const setAddr = (field, value) =>
    dispatch(setBillingAddressField({ field, value }));

  // If users jump directly, optionally guard:
  if (!attendees || attendees.length === 0) {
    // ensure at least one
    // navigate(`/checkout/${id}/attendees`); // uncomment to hard-guard
  }

  return (
    <div className="bg-[#222222] border border-[#333333] rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FiHome className="w-5 h-5" />
        Billing Information
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Full Name *
            </label>
            <input
              value={billing.name}
              onChange={(e) => setF("name", e.target.value)}
              className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <FiMail className="w-4 h-4" /> Email *
            </label>
            <input
              type="email"
              value={billing.email}
              onChange={(e) => setF("email", e.target.value)}
              className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <FiPhone className="w-4 h-4" /> Phone
            </label>
            <input
              value={billing.phone}
              onChange={(e) => setF("phone", e.target.value)}
              className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
              placeholder="Enter phone"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-300 flex items-center gap-2">
            <FiHome className="w-4 h-4" /> Billing Address *
          </h3>

          <input
            value={billing.address.line1}
            onChange={(e) => setAddr("line1", e.target.value)}
            placeholder="Street Address *"
            className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
            required
          />
          <input
            value={billing.address.line2}
            onChange={(e) => setAddr("line2", e.target.value)}
            placeholder="Apt, Suite, etc. (Optional)"
            className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              value={billing.address.city}
              onChange={(e) => setAddr("city", e.target.value)}
              placeholder="City *"
              className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
              required
            />
            <input
              value={billing.address.state}
              onChange={(e) => setAddr("state", e.target.value)}
              placeholder="State *"
              className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={billing.address.postal_code}
              onChange={(e) => setAddr("postal_code", e.target.value)}
              placeholder="ZIP Code *"
              className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
              required
            />
            <select
              value={billing.address.country}
              onChange={(e) => setAddr("country", e.target.value)}
              className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(`/checkout/${id}/attendees`)}
            className="flex-1 bg-[#2d2d2d] border border-[#333333] text-white font-semibold py-3 px-6 rounded-xl"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 gradient-bg text-black font-bold py-3 px-6 rounded-xl"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
