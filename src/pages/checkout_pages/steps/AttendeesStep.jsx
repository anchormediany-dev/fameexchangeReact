import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import { currency } from "../utils";
import {
  useGetEventByIdQuery,
  useAddIntentMutation,
} from "../../../app/authApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setAttendees,
  setPaymentIntent,
} from "../../../features/checkout/checkoutSlice";
import { selectAttendees } from "../../../features/checkout/checkoutSelectors";

export default function AttendeesStep() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading } = useGetEventByIdQuery(id, { skip: !id });
  const event = data?.data;

  const hasDiscount = (event?.discount_percent || 0) > 0;
  const finalPrice = hasDiscount
    ? (event?.price || 0) * (1 - (event?.discount_percent || 0) / 100)
    : event?.price || 0;

  const attendeesFromStore = useSelector(selectAttendees);
  const [attendees, setLocalAttendees] = useState(
    attendeesFromStore?.length
      ? attendeesFromStore
      : [{ firstName: "", lastName: "", phone: "", email: "" }]
  );

  const [addIntent, { isLoading: isCreatingIntent, error: intentError }] =
    useAddIntentMutation();

  const allAttendeesValid = attendees.every(
    (a) => a.firstName && a.lastName && a.phone && a.email
  );
  const totalAmount = (finalPrice || 0) * attendees.length;

  const handleAdd = () =>
    setLocalAttendees((s) => [
      ...s,
      { firstName: "", lastName: "", phone: "", email: "" },
    ]);

  const handleRemove = (idx) =>
    setLocalAttendees((s) =>
      s.length > 1 ? s.filter((_, i) => i !== idx) : s
    );

  const handleChange = (idx, key, value) =>
    setLocalAttendees((s) => {
      const next = [...s];
      next[idx][key] = value;
      return next;
    });

  const createIntentAndGo = async () => {
    if (!allAttendeesValid) return;

    // Save attendees transiently in store
    dispatch(setAttendees(attendees));

    const payload = {
      eventId: id,
      type: "event",
      currency: "usd",
      no_of_persons: attendees.length,
      attendees: attendees.map((a) => ({
        fullName: `${a.firstName} ${a.lastName}`.trim(),
        email: a.email,
        phone: a.phone,
      })),
    };

    try {
      const res = await addIntent(payload).unwrap();
      if (res?.success && res?.clientSecret) {
        dispatch(setPaymentIntent(res));
        navigate(`/checkout/${id}/billing`);
      } else {
        throw new Error("Failed to create payment intent");
      }
    } catch (e) {
      console.error(e);
      alert(e?.data?.message || e.message || "Failed to create payment intent");
    }
  };

  if (isLoading) return <div className="animate-pulse">Loading…</div>;
  if (!event) return <div className="text-red-300">Event not found.</div>;

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
          {attendees.map((a, idx) => (
            <div
              key={idx}
              className="border border-[#333333] rounded-xl p-5 bg-[#2d2d2d]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Attendee {idx + 1}</h3>
                {attendees.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="text-red-400 hover:text-red-300 text-sm font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="First name *"
                  className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
                  value={a.firstName}
                  onChange={(e) =>
                    handleChange(idx, "firstName", e.target.value)
                  }
                  required
                />
                <input
                  placeholder="Last name *"
                  className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
                  value={a.lastName}
                  onChange={(e) =>
                    handleChange(idx, "lastName", e.target.value)
                  }
                  required
                />
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                    <FiPhone className="w-4 h-4" /> Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone *"
                    className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
                    value={a.phone}
                    onChange={(e) => handleChange(idx, "phone", e.target.value)}
                    required
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                    <FiMail className="w-4 h-4" /> Email *
                  </label>
                  <input
                    type="email"
                    placeholder="Email *"
                    className="w-full bg-[#171717] border border-[#333333] rounded-lg px-4 py-3 text-white"
                    value={a.email}
                    onChange={(e) => handleChange(idx, "email", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="w-full mt-4 border-2 border-dashed border-[#333333] rounded-xl py-4 text-gray-400 hover:text-white hover:border-[#F3BA18]"
        >
          + Add Another Attendee
        </button>
      </div>

      <button
        onClick={createIntentAndGo}
        disabled={!allAttendeesValid || isCreatingIntent}
        className="w-full gradient-bg text-black font-bold py-4 px-6 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isCreatingIntent
          ? "Creating Payment…"
          : `Continue to Billing - ${currency(totalAmount)}`}
      </button>

      {intentError && (
        <div className="p-4 bg-red-900/20 border border-red-700 rounded-xl text-red-300">
          {intentError?.data?.message || "Failed to process payment."}
        </div>
      )}
    </div>
  );
}
