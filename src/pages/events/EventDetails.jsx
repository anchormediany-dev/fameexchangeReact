import React, { useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLink,
  FaPhone,
  FaImage,
  FaDollarSign,
  FaPercent,
} from "react-icons/fa";

/**
 * HOW DATA ARRIVES?
 * - Prefer passing the event in router state: navigate("/events/:id", { state: { event } })
 * - Or supply it as a prop <EventDetails event={...} />
 * - If neither is provided, a tiny demo fallback is shown so the layout renders.
 */

const DEMO_EVENT = {
  id: "demo123",
  datetime: "2025-08-09T15:00:00Z",
  title: "My Exclusive Event test 1",
  summary: "Quick summary of the event",
  details:
    "Full details here. You can place rich content, schedule, lineup, FAQ, etc.",
  event_type: "live",
  status: "active",
  category: "music",
  location: "Los Angeles",
  address: "123 LA Street",
  phone: "+1-555-1212",
  website: "https://example.com",
  organizername: "DJ Dovav Events",
  is_featured: true,
  regular_price: 100,
  discount_percent: 10,
  discount_codes: ["SUMMER2025", "VIPACCESS"],
  event_coordinates: { lat: 34.0522, long: -118.2437 },
  prefrence: "interested",
  // If your API returns URLs, use these keys (examples):
  logo: "https://dummyimage.com/200x200/2d2d2d/ffffff.png&text=Logo",
  event_cover:
    "https://dummyimage.com/1200x500/1a1a1a/ffffff.png&text=Event+Cover",
  event_images: [
    "https://dummyimage.com/600x400/2d2d2d/ffffff.png&text=Gallery+1",
    "https://dummyimage.com/600x400/2d2d2d/ffffff.png&text=Gallery+2",
    "https://dummyimage.com/600x400/2d2d2d/ffffff.png&text=Gallery+3",
  ],
};

function formatDateTime(v) {
  if (!v) return "-";
  // Works with ISO or "YYYY-MM-DDTHH:mm" (from datetime-local)
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function currency(v) {
  if (v === "" || v === null || v === undefined) return "-";
  const n = Number(v);
  if (Number.isNaN(n)) return String(v);
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function Badge({ children, color = "default" }) {
  const base =
    "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border";
  const map = {
    default: "bg-[#2d2d2d] text-white border-[#333333]",
    gold: "bg-[#F3BA18]/10 text-[#F3BA18] border-[#F3BA18]/40",
    green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
    red: "bg-red-500/10 text-red-300 border-red-500/40",
    blue: "bg-sky-500/10 text-sky-300 border-sky-500/40",
    gray: "bg-[#2d2d2d] text-gray-300 border-[#333333]",
  };
  return <span className={`${base} ${map[color]}`}>{children}</span>;
}

function Labeled({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      {Icon && <Icon className="mt-1 text-gray-400 shrink-0" />}
      <div>
        <div className="text-sm text-gray-400">{label}</div>
        <div className="text-white">{children || "-"}</div>
      </div>
    </div>
  );
}

export default function EventDetails({ event: eventProp }) {
  const { state } = useLocation();
  const { id } = useParams();
  const event = useMemo(
    () => eventProp || state?.event || DEMO_EVENT,
    [eventProp, state]
  );

  // Choose media fields, supporting multiple possible API shapes
  const logoUrl = event.logo_url || event.logo || event.logoUrl || "";
  const coverUrl =
    event.event_cover_url || event.event_cover || event.coverUrl || "";
  const gallery =
    event.event_images || event.gallery || event.gallery_urls || [];

  const mapsHref = event.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        event.address || ""
      )}`
    : event.event_coordinates?.lat && event.event_coordinates?.long
    ? `https://www.google.com/maps/search/?api=1&query=${event.event_coordinates.lat},${event.event_coordinates.long}`
    : null;

  const discountedPrice = event.discount_percent
    ? (Number(event.regular_price) || 0) *
      (1 - Number(event.discount_percent) / 100)
    : null;

  return (
    <MotionPageWrapper>
      <div className="bg-[#171717] min-h-screen">
        {/* HERO / COVER */}
        <div className="relative">
          <div className="h-64 md:h-80 lg:h-[22rem] w-full overflow-hidden">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt="Event cover"
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                <FaImage className="text-gray-600" size={48} />
              </div>
            )}
          </div>

          {/* overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent" />

          {/* Title block */}
          <div className="container">
            <div className="absolute bottom-4 left-0 right-0 px-4 md:px-0">
              <div className="flex items-end gap-4">
                {/* Logo */}
                <div className="-mb-8 hidden md:block">
                  <div className="p-1 rounded-xl bg-[#171717] shadow">
                    <div className="size-24 rounded-lg overflow-hidden bg-[#222222] flex items-center justify-center">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt="Event logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaImage className="text-gray-600" size={28} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {event.is_featured && <Badge color="gold">Featured</Badge>}
                    {event.category && <Badge>{event.category}</Badge>}
                    {event.event_type && (
                      <Badge color="blue">{event.event_type}</Badge>
                    )}
                    {event.status && (
                      <Badge
                        color={event.status === "active" ? "green" : "gray"}
                      >
                        {event.status}
                      </Badge>
                    )}
                    {event.prefrence && <Badge>{event.prefrence}</Badge>}
                  </div>

                  <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold drop-shadow">
                    {event.title || "Untitled Event"}
                  </h1>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <span className="inline-flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      {formatDateTime(event.datetime)}
                    </span>
                    {event.location && (
                      <span className="inline-flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-400" />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="container -mt-10 md:mt-0 pb-16 px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT: Summary + Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#222222] rounded-xl border border-[#333333] p-6">
                <h2 className="text-[#F3BA18] text-lg font-semibold mb-2">
                  Summary
                </h2>
                <p className="text-gray-200 leading-relaxed">
                  {event.summary || "—"}
                </p>
              </div>

              <div className="bg-[#222222] rounded-xl border border-[#333333] p-6">
                <h2 className="text-[#F3BA18] text-lg font-semibold mb-2">
                  Details
                </h2>
                <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                  {event.details || "—"}
                </p>
              </div>

              {/* GALLERY */}
              <div className="bg-[#222222] rounded-xl border border-[#333333] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#F3BA18] text-lg font-semibold">
                    Gallery
                  </h2>
                  <span className="text-xs text-gray-400">
                    {Array.isArray(gallery) ? gallery.length : 0} image
                    {Array.isArray(gallery) && gallery.length !== 1 ? "s" : ""}
                  </span>
                </div>
                {Array.isArray(gallery) && gallery.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {gallery.map((src, i) => (
                      <a
                        key={i}
                        href={src}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-lg overflow-hidden border border-[#333333] bg-[#1a1a1a] hover:opacity-95"
                        title="Open full image"
                      >
                        <img
                          src={src}
                          alt={`event-img-${i}`}
                          className="w-full h-32 md:h-40 object-cover"
                        />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="h-28 rounded-lg border border-dashed border-[#333333] bg-[#1a1a1a] flex items-center justify-center">
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaImage />
                      No gallery images
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Info Cards */}
            <div className="space-y-6">
              <div className="bg-[#222222] rounded-xl border border-[#333333] p-6">
                <h3 className="text-[#F3BA18] font-semibold mb-4">
                  Event Info
                </h3>
                <div className="space-y-4">
                  <Labeled icon={FaCalendarAlt} label="Date & Time">
                    {formatDateTime(event.datetime)}
                  </Labeled>
                  <Labeled icon={FaMapMarkerAlt} label="Address">
                    {event.address || "—"}
                    {event.address && (
                      <div className="mt-1">
                        {mapsHref && (
                          <a
                            href={mapsHref}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#F3BA18] text-sm hover:underline"
                          >
                            Open in Maps
                          </a>
                        )}
                      </div>
                    )}
                  </Labeled>
                  <div className="grid grid-cols-2 gap-4">
                    <Labeled label="Latitude">
                      {event.event_coordinates?.lat ?? "—"}
                    </Labeled>
                    <Labeled label="Longitude">
                      {event.event_coordinates?.long ?? "—"}
                    </Labeled>
                  </div>
                  <Labeled icon={FaPhone} label="Phone">
                    {event.phone || "—"}
                  </Labeled>
                  <Labeled icon={FaLink} label="Website">
                    {event.website ? (
                      <a
                        href={event.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#F3BA18] hover:underline break-all"
                      >
                        {event.website}
                      </a>
                    ) : (
                      "—"
                    )}
                  </Labeled>
                  <Labeled label="Organizer">
                    {event.organizername || "—"}
                  </Labeled>
                </div>
              </div>

              <div className="bg-[#222222] rounded-xl border border-[#333333] p-6">
                <h3 className="text-[#F3BA18] font-semibold mb-4">Pricing</h3>
                <div className="space-y-4">
                  <Labeled icon={FaDollarSign} label="Regular Price">
                    {currency(event.regular_price)}
                  </Labeled>
                  <Labeled icon={FaPercent} label="Discount">
                    {event.discount_percent
                      ? `${event.discount_percent}%`
                      : "—"}
                  </Labeled>
                  <Labeled label="Price After Discount">
                    {discountedPrice !== null ? currency(discountedPrice) : "—"}
                  </Labeled>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Discount Codes
                    </div>
                    {Array.isArray(event.discount_codes) &&
                    event.discount_codes.length ? (
                      <div className="flex flex-wrap gap-2">
                        {event.discount_codes.map((c, i) => (
                          <Badge key={i}>{c}</Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-white">—</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Small card for quick meta */}
              <div className="bg-[#222222] rounded-xl border border-[#333333] p-6">
                <h3 className="text-[#F3BA18] font-semibold mb-4">Meta</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>{event.category || "—"}</Badge>
                  <Badge color="blue">{event.event_type || "—"}</Badge>
                  <Badge color={event.status === "active" ? "green" : "gray"}>
                    {event.status || "—"}
                  </Badge>
                  <Badge>{event.prefrence || "—"}</Badge>
                  {event.is_featured && <Badge color="gold">Featured</Badge>}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-[#222222] rounded-xl border border-[#333333] p-6">
                <div className="flex items-center justify-between">
                  <Link
                    to="/events"
                    className="px-4 py-2 rounded-md bg-[#2d2d2d] text-white hover:opacity-90 border border-[#333333]"
                  >
                    Back to Events
                  </Link>
                  {/* Add your own Edit route if you have one */}
                  {/* <Link to={`/events/${id}/edit`} className="px-4 py-2 rounded-md bg-gradient-to-r from-[#F3BA18] to-[#FF9900] text-black hover:opacity-90">Edit Event</Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionPageWrapper>
  );
}
