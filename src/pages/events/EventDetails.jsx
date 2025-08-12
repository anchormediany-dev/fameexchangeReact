import { useParams, useNavigate } from "react-router-dom";
import { FiCalendar, FiGlobe, FiPhone } from "react-icons/fi";
import { useGetEventByIdQuery } from "../../app/authApi";
import EventsPreferencesActions from "../../components/events/EventsPreferencesActions";

const CDN_BASE = import.meta.env.VITE_API_IMAGE_BASE_URL || "";

// Internet fallbacks
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

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetEventByIdQuery(id, {
    skip: !id,
  });

  const event = data?.data;

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

  // ✅ Cover fallback chain
  const cover =
    resolveImage(event?.event_cover) ||
    resolveImage(
      Array.isArray(event?.event_images) ? event?.event_images?.[0] : ""
    ) ||
    resolveImage(event?.userId?.images?.[0]?.fileUrl) ||
    FALLBACK_COVER;

  // ✅ Logo fallback chain (always show something)
  const logo =
    resolveImage(event?.logo) ||
    resolveImage(event?.userId?.images?.[0]?.fileUrl) ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      event?.userId?.name || event?.title || "Event"
    )}` ||
    FALLBACK_LOGO_PLACEHOLDER;

  const pref = event?.prefrence ?? event?.preference ?? "—";
  const lat = event?.event_coordinates?.lat ?? "—";
  const lng = event?.event_coordinates?.long ?? "—";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#171717] text-gray-300 p-8">
        Loading…
      </div>
    );
  }
  if (isError) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center p-6">
        <div className="bg-[#222222] border border-[#333333] rounded-xl p-8 max-w-lg w-full text-center text-white">
          <p className="text-lg font-semibold mb-2">Couldn’t load event</p>
          <p className="text-gray-400 text-sm mb-6">
            {error?.data?.message || "Please try again."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg gradient-bg text-white font-semibold cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#171717] min-h-screen mt-20 text-white">
      {/* Hero with COVER + overlay + LOGO + Title + Date */}
      <div
        className="h-72 md:h-96 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${cover})`, backgroundColor: "#222222" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8 flex items-center gap-4">
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover border border-[#333333] bg-[#222222]"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {event?.title || "Event"}
            </h1>
            {when && (
              <div className="mt-1 flex items-center gap-2 text-gray-200 text-sm">
                <FiCalendar className="gredient-icon" />
                <span>{when}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 py-20 -mt-6 md:-mt-10 pb-14">
        <div className="bg-[#222222] border border-[#333333] rounded-2xl overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {event?.is_featured && (
                <span className="text-xs px-3 py-1 rounded-full gradient-bg text-black font-semibold">
                  Featured
                </span>
              )}
              {event?.event_type && (
                <span className="text-xs px-3 py-1 rounded-full bg-[#2d2d2d] border border-[#333333]">
                  Type: {event.event_type}
                </span>
              )}
              {event?.category && (
                <span className="text-xs px-3 py-1 rounded-full bg-[#2d2d2d] border border-[#333333]">
                  Category: {event.category}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main column */}
              <div className="lg:col-span-2">
                {(event?.regular_price || hasDiscount) && (
                  <div className="bg-[#2d2d2d] border border-[#333333] rounded-xl p-5 mb-6">
                    <div className="flex items-end gap-3">
                      <span className="text-2xl font-bold">
                        {currency(finalPrice)}
                      </span>
                      {hasDiscount && (
                        <>
                          <span className="line-through text-gray-400">
                            {currency(event?.regular_price)}
                          </span>
                          <span className="text-xs px-2 py-1 rounded bg-[#171717] border border-[#333333]">
                            {event.discount_percent}% OFF
                          </span>
                        </>
                      )}
                    </div>
                    {!!event?.discount_codes?.length && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {event.discount_codes.map((c) => (
                          <span
                            key={c}
                            className="text-xs bg-[#171717] border border-[#333333] rounded-full px-3 py-1"
                          >
                            CODE:{" "}
                            <strong className="gredient-icon ml-1">{c}</strong>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {event?.details && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">
                      Event Details
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {event.details}
                    </p>
                  </div>
                )}
                {/* Location, Preference & Coordinates (text-only) */}
                <div className="mb-2">
                  <h3 className="text-lg font-semibold mb-3">
                    Location & Coordinates
                  </h3>
                  <div className="rounded-xl border border-[#333333] bg-[#2d2d2d] p-4 text-sm text-gray-200 space-y-2">
                    <div>
                      <span className="text-gray-400">Location: </span>
                      <span className="text-white">
                        {event?.location || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Address: </span>
                      <span className="text-white">
                        {event?.address || "—"}
                      </span>
                    </div>
                    {pref && (
                      <div>
                        <span className="text-gray-400">Preference: </span>
                        <span className="text-white">{pref}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Coordinates: </span>
                      <span className="text-white">
                        lat: {String(lat)}, long: {String(lng)}
                      </span>
                    </div>
                  </div>
                </div>{" "}
                <aside className="space-y-6">
                  {/* <div className="bg-[#2d2d2d] border border-[#333333] rounded-xl p-5">
                  <button
                    onClick={() =>
                      event?.website
                        ? window.open(
                            event.website,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        : alert("Tickets link not available.")
                    }
                    className="w-full bg-gradient-to-r from-[#F3BA18] to-[#FF9900] hover:from-[#FF9900] hover:to-[#F3BA18] text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
                  >
                    Get Tickets
                  </button>
                  <p className="text-xs text-gray-400 mt-3">
                    Event ID:{" "}
                    <span className="text-gray-300">{event?._id}</span>
                  </p>
                </div> */}

                  {(event?.website || event?.phone) && (
                    <div className="bg-[#2d2d2d] border border-[#333333] rounded-xl p-5 text-gray-200">
                      <h4 className="font-semibold mb-3 text-white">Links</h4>
                      <ul className="space-y-2 text-sm">
                        {event?.website && (
                          <li className="flex items-center gap-2">
                            <FiGlobe className="gredient-icon" />
                            <a
                              className="hover:underline"
                              href={event.website}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {new URL(event.website).hostname}
                            </a>
                          </li>
                        )}
                        {event?.phone && (
                          <li className="flex items-center gap-2">
                            <FiPhone className="gredient-icon" />
                            <a
                              className="hover:underline"
                              href={`tel:${event.phone}`}
                            >
                              {event.phone}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {event?.userId && (
                    <div className="bg-[#2d2d2d] border border-[#333333] rounded-xl p-5">
                      <h4 className="font-semibold mb-4 text-white">
                        Organizer
                      </h4>
                      <div className="flex items-center gap-4">
                        <img
                          className="w-14 h-14 rounded-full object-cover border border-[#333333]"
                          src={
                            resolveImage(event.userId.images?.[0]?.fileUrl) ||
                            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                              event.userId.name || "User"
                            )}`
                          }
                          alt="Organizer"
                        />
                        <div className="text-white">
                          <p className="font-semibold">{event.userId.name}</p>
                          <p className="text-xs text-gray-400">
                            {event.userId.role}
                          </p>
                        </div>
                      </div>
                      {/* no message button */}
                    </div>
                  )}
                </aside>
              </div>
              <EventsPreferencesActions />
              {/* Sidebar (no duplicates, no message organizer) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
