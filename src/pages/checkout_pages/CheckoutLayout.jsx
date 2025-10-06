import React, { useMemo } from "react";
import {
  Outlet,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiMapPin, FiCheck } from "react-icons/fi";
import { useGetEventByIdQuery } from "../../app/authApi"; // adjust if your hook path differs

// ---- Helpers (kept local so this file is standalone) ----
const CDN_BASE = import.meta.env.VITE_API_IMAGE_BASE_URL || "";
const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop";
const FALLBACK_LOGO_PLACEHOLDER = "https://placehold.co/80x80/png?text=LOGO";

function resolveImage(p) {
  if (!p) return "";
  if (/^https?:|^data:/.test(p)) return p;
  const normalized = p.replace(/\\/g, "/");
  const base = CDN_BASE.replace(/\/$/, "");
  const path = normalized.replace(/^\//, "");
  return `${base}/${path}`;
}

function currency(n) {
  return typeof n === "number"
    ? n.toLocaleString(undefined, { style: "currency", currency: "USD" })
    : "";
}

// Route map for steps (order matters)
const STEPS = [
  { id: "attendees", name: "Attendee Info", number: 1, path: "attendees" },
  { id: "billing", name: "Billing Address", number: 2, path: "billing" },
  { id: "payment", name: "Payment", number: 3, path: "payment" },
  { id: "confirmation", name: "Confirmation", number: 4, path: "confirmation" },
];

export default function CheckoutLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Fetch event (for title, date/time, location, price summary)
  const { data, isLoading } = useGetEventByIdQuery(id, { skip: !id });
  const event = data?.data;

  // Derived event values
  const when = useMemo(() => {
    if (!event?.datetime) return "";
    try {
      return new Date(event.datetime).toLocaleString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  }, [event?.datetime]);

  const hasDiscount = (event?.discount_percent || 0) > 0;
  const finalPrice = hasDiscount
    ? (event?.price || 0) * (1 - (event?.discount_percent || 0) / 100)
    : event?.price || 0;

  const cover = resolveImage(event?.event_cover) || FALLBACK_COVER;
  const logo = resolveImage(event?.logo) || FALLBACK_LOGO_PLACEHOLDER;

  // Figure out current step from URL
  const currentIndex =
    STEPS.findIndex((s) => location.pathname.endsWith(`/${s.path}`)) ?? 0;

  return (
    <div className="min-h-screen bg-[#171717] text-white mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-gray-400 mt-2">
          {isLoading
            ? "Preparing event…"
            : event
            ? `Complete your ticket purchase for ${event.title}`
            : ""}
        </p>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mt-8 max-w-2xl">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <NavLink
                    to={`/checkout/${id}/${step.path}`}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      isCompleted || isCurrent
                        ? "bg-[#F3BA18] text-black"
                        : "bg-[#2d2d2d] text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <FiCheck className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </NavLink>
                  <span
                    className={`text-xs mt-2 text-center ${
                      isCompleted || isCurrent
                        ? "text-[#F3BA18]"
                        : "text-gray-400"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      index < currentIndex ? "bg-[#F3BA18]" : "bg-[#333333]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Grid: Main (Outlet) + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main content: step pages render here */}
          <div className="lg:col-span-2">
            <Outlet />
          </div>

          {/* Sidebar: Event summary */}
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
                  <h3 className="text-xl font-bold mb-2">
                    {event?.title || "Event"}
                  </h3>

                  {when && (
                    <div className="flex items-center gap-3 text-gray-300 mb-3">
                      <FiCalendar className="w-4 h-4 gredient-icon" />
                      <span className="text-sm">{when}</span>
                    </div>
                  )}

                  {event?.location && (
                    <div className="flex items-center gap-3 text-gray-300 mb-4">
                      <FiMapPin className="w-4 h-4 gredient-icon" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  )}

                  {/* Price Summary (unit price only; quantity & total shown on steps) */}
                  <div className="border-t border-[#333333] pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Ticket Price</span>
                      <span className="font-semibold">
                        {currency(finalPrice)}
                      </span>
                    </div>

                    {hasDiscount && (
                      <div className="flex justify-between items-center text-green-400">
                        <span>Discount</span>
                        <span>-{event?.discount_percent}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* You can add an extra card for FAQs / support here if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
