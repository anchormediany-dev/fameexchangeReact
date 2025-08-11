import FeaturedEvents from "../../components/events/FeaturedEvents";
import EventsListings from "../../components/events/EventsListings";
import GoogleMapsEvents from "../../components/events/GoogleMapsEvents";
import EventsPreferencesActions from "../../components/events/EventsPreferencesActions";
import EventsCalendar from "../../components/events/EventsCalendar";
import SearchEvents from "../../components/events/SearchEvents";
import { useGetEventsQuery } from "../../app/authApi";
import { useState, useMemo } from "react";
const CDN_BASE = import.meta.env.VITE_API_IMAGE_BASE_URL || "";
const sameDay = (a, b) =>
  a &&
  b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const UltraModernEventsPllatform = () => {
  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetEventsQuery();
  const [eventsDate, setEventsDate] = useState(null);
  console.log(eventsDate);
  const resolveImage = (p) => {
    if (!p) return "";
    if (/^https?:\/\//i.test(p)) return p;
    const cleaned = String(p).replace(/\\/g, "/").replace(/^\/+/, "");
    return `${CDN_BASE}${cleaned}`;
  };

  const raw = Array.isArray(data?.data) ? data.data : [];

  const events = raw.map((e) => ({
    id: e._id,
    name: e.title,
    details: e.details,
    type: e.event_type,
    status: e.status,
    category: e.category,
    location: e.location,
    address: e.address,
    phone: e.phone,
    website: e.website,
    datetime: e.datetime,
    createdAt: e.createdAt,
    coordinates: e.event_coordinates || null,
    isFeatured: !!e.is_featured,
    regularPrice: e.regular_price,
    discountPercent: e.discount_percent,
    discountCodes: e.discount_codes || [],
    preference: e.prefrence,
    logo: resolveImage(e.logo),
    cover: resolveImage(e.event_cover),
    images: (e.event_images || []).map(resolveImage),
  }));
  const filteredEvents = useMemo(() => {
    if (!eventsDate) return events;
    return events.filter((ev) => {
      if (!ev.datetime) return false;
      const created = new Date(ev.datetime);
      return sameDay(created, eventsDate);
    });
  }, [events, eventsDate]);
  const featuredEvents = useMemo(
    () => events.filter((e) => e.isFeatured),
    [events]
  );
  return (
    <section className="w-full z-50 bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="2xl:gap-16 gap-12 px-4 container sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20">
        <SearchEvents />
        <div className="flex flex-col 2xl:gap-16 gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-stretch">
            <GoogleMapsEvents />
            <EventsCalendar
              events={events}
              selectedDate={eventsDate}
              onDateChange={setEventsDate}
            />
            <EventsPreferencesActions />
          </div>
          <EventsListings
            events={filteredEvents}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isFetching={isFetching}
            onRetry={refetch}
            eventsDate={eventsDate}
          />
          <FeaturedEvents events={featuredEvents} />
        </div>
      </div>
    </section>
  );
};

export default UltraModernEventsPllatform;
